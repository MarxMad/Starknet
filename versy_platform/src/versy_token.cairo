use starknet::ContractAddress;

#[starknet::interface]
pub trait IVersyTokenExternal<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
    fn burn(ref self: TContractState, amount: u256);
}

#[starknet::contract]
pub mod VersyToken {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use starknet::get_caller_address;
    use core::num::traits::Zero;
    use openzeppelin_token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use openzeppelin_access::ownable::OwnableComponent;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
    
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    // Total Supply: 1,000,000,000 VERSY with 18 decimals
    // = 1_000_000_000 * 10^18
    const TOTAL_SUPPLY: u256 = 1_000_000_000_000_000_000_000_000_000;

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        let name = "Versy Token";
        let symbol = "VERSY";

        self.erc20.initializer(name, symbol);
        self.ownable.initializer(owner);
        
        // Mint total supply to owner who will distribute according to tokenomics
        self.erc20.mint(owner, TOTAL_SUPPLY);
    }

    #[abi(embed_v0)]
    impl VersyTokenExternalImpl of super::IVersyTokenExternal<ContractState> {
        // Only platform contract can mint (for subsidies)
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            self.ownable.assert_only_owner();
            self.erc20.mint(recipient, amount);
        }

        // Users can burn their own tokens
        fn burn(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            self.erc20.burn(caller, amount);
        }
    }
}

