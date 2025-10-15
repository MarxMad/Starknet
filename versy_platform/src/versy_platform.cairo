use starknet::ContractAddress;

// Video metadata structure
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Video {
    pub video_id: u256,
    pub creator: ContractAddress,
    pub ipfs_hash: felt252,
    pub title: felt252,
    pub likes_count: u256,
    pub created_at: u64,
}

#[starknet::interface]
pub trait IVersyPlatform<TContractState> {
    // Video management
    fn upload_video(ref self: TContractState, ipfs_hash: felt252, title: felt252) -> u256;
    fn like_video(ref self: TContractState, video_id: u256);
    
    // Views
    fn get_video(self: @TContractState, video_id: u256) -> Video;
    fn get_all_videos(self: @TContractState) -> Array<u256>;
    fn get_videos_by_user(self: @TContractState, user: ContractAddress) -> Array<u256>;
    fn has_user_liked(self: @TContractState, video_id: u256, user: ContractAddress) -> bool;
    fn get_total_videos(self: @TContractState) -> u256;
    
    // Platform management
    fn get_treasury_balance(self: @TContractState) -> u256;
    fn withdraw_treasury(ref self: TContractState, amount: u256);
    fn update_like_reward(ref self: TContractState, new_amount: u256);
    fn get_like_reward(self: @TContractState) -> u256;
    
    // User onboarding
    fn claim_welcome_bonus(ref self: TContractState);
    fn has_claimed_welcome(self: @TContractState, user: ContractAddress) -> bool;
}

#[starknet::contract]
pub mod VersyPlatform {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::get_contract_address;
    use core::num::traits::Zero;
    use core::num::traits::CheckedAdd;
    use core::num::traits::CheckedSub;
    use core::num::traits::CheckedMul;
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use super::Video;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        next_video_id: u256,
        videos: Map<u256, Video>,
        user_videos: Map<(ContractAddress, u64), u256>,
        user_video_count: Map<ContractAddress, u64>,
        video_likes: Map<(u256, ContractAddress), bool>,
        treasury_balance: u256,
        like_reward_amount: u256,
        versy_token: ContractAddress,
        welcome_bonus_claimed: Map<ContractAddress, bool>,
        welcome_bonus_amount: u256,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        VideoUploaded: VideoUploaded,
        VideoLiked: VideoLiked,
        RewardDistributed: RewardDistributed,
        TreasuryDeposit: TreasuryDeposit,
        WelcomeBonusClaimed: WelcomeBonusClaimed,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    #[derive(Drop, starknet::Event)]
    pub struct VideoUploaded {
        pub video_id: u256,
        pub creator: ContractAddress,
        pub ipfs_hash: felt252,
        pub timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct VideoLiked {
        pub video_id: u256,
        pub liker: ContractAddress,
        pub creator: ContractAddress,
        pub reward_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RewardDistributed {
        pub video_id: u256,
        pub creator: ContractAddress,
        pub creator_reward: u256,
        pub treasury_fee: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TreasuryDeposit {
        pub amount: u256,
        pub total_balance: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct WelcomeBonusClaimed {
        pub user: ContractAddress,
        pub amount: u256,
    }

    // Constants
    const LIKE_REWARD: u256 = 10_000_000_000_000_000_000; // 10 VERSY with 18 decimals
    const CREATOR_PERCENTAGE: u256 = 67; // 67%
    const TREASURY_PERCENTAGE: u256 = 33; // 33%
    const WELCOME_BONUS: u256 = 150_000_000_000_000_000_000; // 150 VERSY

    #[constructor]
    fn constructor(
        ref self: ContractState, 
        owner: ContractAddress,
        versy_token_address: ContractAddress
    ) {
        self.ownable.initializer(owner);
        self.next_video_id.write(1);
        self.like_reward_amount.write(LIKE_REWARD);
        self.versy_token.write(versy_token_address);
        self.treasury_balance.write(0);
        self.welcome_bonus_amount.write(WELCOME_BONUS);
    }

    #[abi(embed_v0)]
    impl VersyPlatformImpl of super::IVersyPlatform<ContractState> {
        fn upload_video(ref self: ContractState, ipfs_hash: felt252, title: felt252) -> u256 {
            let caller = get_caller_address();
            assert!(!caller.is_zero(), "Invalid caller address");
            assert!(ipfs_hash != 0, "IPFS hash cannot be empty");
            assert!(title != 0, "Title cannot be empty");

            let video_id = self.next_video_id.read();
            let timestamp = get_block_timestamp();

            let video = Video {
                video_id,
                creator: caller,
                ipfs_hash,
                title,
                likes_count: 0,
                created_at: timestamp,
            };

            self.videos.entry(video_id).write(video);

            // Add to user's videos
            let user_count = self.user_video_count.entry(caller).read();
            self.user_videos.entry((caller, user_count)).write(video_id);
            self.user_video_count.entry(caller).write(user_count + 1);

            // Increment video ID
            let next_id = video_id.checked_add(1);
            assert!(next_id.is_some(), "Video ID overflow");
            self.next_video_id.write(next_id.unwrap());

            self.emit(Event::VideoUploaded(
                VideoUploaded { 
                    video_id, 
                    creator: caller, 
                    ipfs_hash,
                    timestamp 
                }
            ));

            video_id
        }

        fn like_video(ref self: ContractState, video_id: u256) {
            let caller = get_caller_address();
            assert!(!caller.is_zero(), "Invalid caller address");

            // Check video exists
            let mut video = self.videos.entry(video_id).read();
            assert!(video.video_id != 0, "Video does not exist");

            // Check user hasn't liked this video before
            assert!(
                !self.video_likes.entry((video_id, caller)).read(),
                "Already liked this video"
            );

            // Check user is not liking their own video
            assert!(video.creator != caller, "Cannot like own video");

            let like_reward = self.like_reward_amount.read();
            
            // Calculate rewards: 67% to creator, 33% to treasury
            let creator_reward_option = like_reward.checked_mul(CREATOR_PERCENTAGE);
            assert!(creator_reward_option.is_some(), "Creator reward calculation overflow");
            let creator_reward = creator_reward_option.unwrap() / 100;

            let treasury_fee_option = like_reward.checked_mul(TREASURY_PERCENTAGE);
            assert!(treasury_fee_option.is_some(), "Treasury fee calculation overflow");
            let treasury_fee = treasury_fee_option.unwrap() / 100;

            // Transfer tokens from liker to platform
            let token = IERC20Dispatcher { contract_address: self.versy_token.read() };
            let platform_address = get_contract_address();
            
            let transfer_success = token.transfer_from(caller, platform_address, like_reward);
            assert!(transfer_success, "Token transfer failed");

            // Transfer creator reward
            let creator_transfer = token.transfer(video.creator, creator_reward);
            assert!(creator_transfer, "Creator reward transfer failed");

            // Add treasury fee to treasury balance
            let current_treasury = self.treasury_balance.read();
            let new_treasury = current_treasury.checked_add(treasury_fee);
            assert!(new_treasury.is_some(), "Treasury balance overflow");
            self.treasury_balance.write(new_treasury.unwrap());

            // Mark as liked
            self.video_likes.entry((video_id, caller)).write(true);

            // Increment likes count
            video.likes_count = video.likes_count.checked_add(1).unwrap();
            self.videos.entry(video_id).write(video);

            self.emit(Event::VideoLiked(
                VideoLiked {
                    video_id,
                    liker: caller,
                    creator: video.creator,
                    reward_amount: like_reward
                }
            ));

            self.emit(Event::RewardDistributed(
                RewardDistributed {
                    video_id,
                    creator: video.creator,
                    creator_reward,
                    treasury_fee
                }
            ));

            self.emit(Event::TreasuryDeposit(
                TreasuryDeposit {
                    amount: treasury_fee,
                    total_balance: new_treasury.unwrap()
                }
            ));
        }

        fn get_video(self: @ContractState, video_id: u256) -> Video {
            let video = self.videos.entry(video_id).read();
            assert!(video.video_id != 0, "Video does not exist");
            video
        }

        fn get_all_videos(self: @ContractState) -> Array<u256> {
            let mut videos = array![];
            let total = self.next_video_id.read();
            
            let mut i: u256 = 1;
            while i < total {
                let video = self.videos.entry(i).read();
                if video.video_id != 0 {
                    videos.append(i);
                }
                i += 1;
            };
            
            videos
        }

        fn get_videos_by_user(self: @ContractState, user: ContractAddress) -> Array<u256> {
            let mut videos = array![];
            let count = self.user_video_count.entry(user).read();

            let mut i: u64 = 0;
            while i < count {
                let video_id = self.user_videos.entry((user, i)).read();
                videos.append(video_id);
                i += 1;
            };

            videos
        }

        fn has_user_liked(
            self: @ContractState, video_id: u256, user: ContractAddress
        ) -> bool {
            self.video_likes.entry((video_id, user)).read()
        }

        fn get_total_videos(self: @ContractState) -> u256 {
            self.next_video_id.read() - 1
        }

        fn get_treasury_balance(self: @ContractState) -> u256 {
            self.treasury_balance.read()
        }

        fn withdraw_treasury(ref self: ContractState, amount: u256) {
            self.ownable.assert_only_owner();
            
            let current_balance = self.treasury_balance.read();
            assert!(amount <= current_balance, "Insufficient treasury balance");

            let new_balance = current_balance.checked_sub(amount);
            assert!(new_balance.is_some(), "Treasury balance underflow");
            
            let token = IERC20Dispatcher { contract_address: self.versy_token.read() };
            let owner = self.ownable.owner();
            
            let transfer_success = token.transfer(owner, amount);
            assert!(transfer_success, "Treasury withdrawal failed");

            self.treasury_balance.write(new_balance.unwrap());
        }

        fn update_like_reward(ref self: ContractState, new_amount: u256) {
            self.ownable.assert_only_owner();
            assert!(new_amount > 0, "Reward amount must be greater than 0");
            self.like_reward_amount.write(new_amount);
        }

        fn get_like_reward(self: @ContractState) -> u256 {
            self.like_reward_amount.read()
        }

        fn claim_welcome_bonus(ref self: ContractState) {
            let caller = get_caller_address();
            assert!(!caller.is_zero(), "Invalid caller address");
            
            let already_claimed = self.welcome_bonus_claimed.entry(caller).read();
            assert!(!already_claimed, "Welcome bonus already claimed");

            let bonus_amount = self.welcome_bonus_amount.read();
            let token = IERC20Dispatcher { contract_address: self.versy_token.read() };
            let platform_address = get_contract_address();

            // Platform needs to have enough tokens to give welcome bonus
            let transfer_success = token.transfer(caller, bonus_amount);
            assert!(transfer_success, "Welcome bonus transfer failed");

            self.welcome_bonus_claimed.entry(caller).write(true);

            self.emit(Event::WelcomeBonusClaimed(
                WelcomeBonusClaimed {
                    user: caller,
                    amount: bonus_amount
                }
            ));
        }

        fn has_claimed_welcome(self: @ContractState, user: ContractAddress) -> bool {
            self.welcome_bonus_claimed.entry(user).read()
        }
    }
}

