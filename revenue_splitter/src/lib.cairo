use starknet::ContractAddress;

#[starknet::interface]
pub trait IRevenueSplitter<TContractState> {
    fn deposit(ref self: TContractState, amount: u256);
    fn distribute(ref self: TContractState);
    fn add_recipient(ref self: TContractState, recipient: ContractAddress, shares: u256);
    fn remove_recipient(ref self: TContractState, recipient: ContractAddress);
    fn get_recipient_shares(self: @TContractState, recipient: ContractAddress) -> u256;
    fn get_total_shares(self: @TContractState) -> u256;
    fn get_balance(self: @TContractState) -> u256;
    fn get_pending_distribution(self: @TContractState, recipient: ContractAddress) -> u256;
}

#[starknet::contract]
pub mod RevenueSplitter {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use starknet::get_caller_address;
    use core::num::traits::Zero;
    use core::num::traits::CheckedAdd;
    use core::num::traits::CheckedSub;
    use core::num::traits::CheckedMul;
    use openzeppelin_access::ownable::OwnableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        balance: u256,
        total_shares: u256,
        recipient_shares: Map<ContractAddress, u256>,
        recipients: Vec<ContractAddress>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        Deposit: Deposit,
        Distribution: Distribution,
        RecipientAdded: RecipientAdded,
        RecipientRemoved: RecipientRemoved,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    #[derive(Drop, starknet::Event)]
    pub struct Deposit {
        pub depositor: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Distribution {
        pub recipient: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RecipientAdded {
        pub recipient: ContractAddress,
        pub shares: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct RecipientRemoved {
        pub recipient: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
        self.balance.write(0);
        self.total_shares.write(0);
    }

    #[abi(embed_v0)]
    impl RevenueSplitterImpl of super::IRevenueSplitter<ContractState> {
        fn deposit(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            assert!(amount > 0, "Amount must be greater than 0");
            
            let current_balance = self.balance.read();
            let new_balance = current_balance.checked_add(amount);
            assert!(new_balance.is_some(), "Overflow in deposit");
            
            self.balance.write(new_balance.unwrap());
            self.emit(Event::Deposit(Deposit { depositor: caller, amount }));
        }

        fn distribute(ref self: ContractState) {
            self.ownable.assert_only_owner();
            
            let total_shares = self.total_shares.read();
            assert!(total_shares > 0, "No recipients configured");
            
            let balance = self.balance.read();
            assert!(balance > 0, "No balance to distribute");

            let mut i: u64 = 0;
            let len = self.recipients.len();
            
            while i < len {
                let recipient = self.recipients.at(i).read();
                let shares = self.recipient_shares.entry(recipient).read();
                
                if shares > 0 {
                    let amount_option = shares.checked_mul(balance);
                    assert!(amount_option.is_some(), "Overflow in distribution calculation");
                    let amount = amount_option.unwrap() / total_shares;
                    
                    if amount > 0 {
                        self.emit(Event::Distribution(Distribution { recipient, amount }));
                    }
                };
                
                i += 1;
            };
            
            self.balance.write(0);
        }

        fn add_recipient(ref self: ContractState, recipient: ContractAddress, shares: u256) {
            self.ownable.assert_only_owner();
            assert!(!recipient.is_zero(), "Invalid recipient address");
            assert!(shares > 0, "Shares must be greater than 0");
            
            let current_shares = self.recipient_shares.entry(recipient).read();
            assert!(current_shares == 0, "Recipient already exists");
            
            let total_shares = self.total_shares.read();
            let new_total_shares = total_shares.checked_add(shares);
            assert!(new_total_shares.is_some(), "Overflow in total shares");
            
            self.recipient_shares.entry(recipient).write(shares);
            self.recipients.push(recipient);
            self.total_shares.write(new_total_shares.unwrap());
            
            self.emit(Event::RecipientAdded(RecipientAdded { recipient, shares }));
        }

        fn remove_recipient(ref self: ContractState, recipient: ContractAddress) {
            self.ownable.assert_only_owner();
            
            let shares = self.recipient_shares.entry(recipient).read();
            assert!(shares > 0, "Recipient does not exist");
            
            let total_shares = self.total_shares.read();
            let new_total_shares = total_shares.checked_sub(shares);
            assert!(new_total_shares.is_some(), "Underflow in total shares");
            
            self.recipient_shares.entry(recipient).write(0);
            self.total_shares.write(new_total_shares.unwrap());
            
            self.emit(Event::RecipientRemoved(RecipientRemoved { recipient }));
        }

        fn get_recipient_shares(self: @ContractState, recipient: ContractAddress) -> u256 {
            self.recipient_shares.entry(recipient).read()
        }

        fn get_total_shares(self: @ContractState) -> u256 {
            self.total_shares.read()
        }

        fn get_balance(self: @ContractState) -> u256 {
            self.balance.read()
        }

        fn get_pending_distribution(
            self: @ContractState, recipient: ContractAddress
        ) -> u256 {
            let shares = self.recipient_shares.entry(recipient).read();
            let total_shares = self.total_shares.read();
            let balance = self.balance.read();
            
            if total_shares == 0 || shares == 0 {
                return 0;
            }
            
            let amount_option = shares.checked_mul(balance);
            if amount_option.is_none() {
                return 0;
            }
            
            amount_option.unwrap() / total_shares
        }
    }
}
