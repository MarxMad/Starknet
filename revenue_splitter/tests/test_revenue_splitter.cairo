use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};
use revenue_splitter::{IRevenueSplitterDispatcher, IRevenueSplitterDispatcherTrait};

fn deploy_contract() -> (IRevenueSplitterDispatcher, ContractAddress) {
    let owner: ContractAddress = starknet::contract_address_const::<'owner'>();
    let contract = declare("RevenueSplitter").unwrap().contract_class();
    let mut calldata = array![];
    calldata.append(owner.into());
    
    let (contract_address, _) = contract.deploy(@calldata).unwrap();
    (IRevenueSplitterDispatcher { contract_address }, owner)
}

fn get_recipient_addresses() -> (ContractAddress, ContractAddress, ContractAddress) {
    let recipient1: ContractAddress = starknet::contract_address_const::<'recipient1'>();
    let recipient2: ContractAddress = starknet::contract_address_const::<'recipient2'>();
    let recipient3: ContractAddress = starknet::contract_address_const::<'recipient3'>();
    (recipient1, recipient2, recipient3)
}

#[test]
fn test_deposit_and_distribute() {
    let (dispatcher, owner) = deploy_contract();
    let (recipient1, recipient2, recipient3) = get_recipient_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    
    dispatcher.add_recipient(recipient1, 50);
    dispatcher.add_recipient(recipient2, 30);
    dispatcher.add_recipient(recipient3, 20);
    
    assert!(dispatcher.get_total_shares() == 100, "Total shares should be 100");
    
    stop_cheat_caller_address(dispatcher.contract_address);
    
    let depositor: ContractAddress = starknet::contract_address_const::<'depositor'>();
    start_cheat_caller_address(dispatcher.contract_address, depositor);
    
    dispatcher.deposit(1000);
    
    assert!(dispatcher.get_balance() == 1000, "Balance should be 1000");
    
    let pending1 = dispatcher.get_pending_distribution(recipient1);
    let pending2 = dispatcher.get_pending_distribution(recipient2);
    let pending3 = dispatcher.get_pending_distribution(recipient3);
    
    assert!(pending1 == 500, "Recipient1 should get 500");
    assert!(pending2 == 300, "Recipient2 should get 300");
    assert!(pending3 == 200, "Recipient3 should get 200");
    
    stop_cheat_caller_address(dispatcher.contract_address);
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    dispatcher.distribute();
    
    assert!(dispatcher.get_balance() == 0, "Balance should be 0 after distribution");
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_unauthorized_distribution() {
    let (dispatcher, owner) = deploy_contract();
    let (recipient1, _, _) = get_recipient_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    dispatcher.add_recipient(recipient1, 100);
    stop_cheat_caller_address(dispatcher.contract_address);
    
    let depositor: ContractAddress = starknet::contract_address_const::<'depositor'>();
    start_cheat_caller_address(dispatcher.contract_address, depositor);
    dispatcher.deposit(1000);
    
    dispatcher.distribute();
}

#[test]
fn test_rounding_edge_case() {
    let (dispatcher, owner) = deploy_contract();
    let (recipient1, recipient2, recipient3) = get_recipient_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    
    dispatcher.add_recipient(recipient1, 1);
    dispatcher.add_recipient(recipient2, 1);
    dispatcher.add_recipient(recipient3, 1);
    
    stop_cheat_caller_address(dispatcher.contract_address);
    
    let depositor: ContractAddress = starknet::contract_address_const::<'depositor'>();
    start_cheat_caller_address(dispatcher.contract_address, depositor);
    
    dispatcher.deposit(10);
    
    let pending1 = dispatcher.get_pending_distribution(recipient1);
    let pending2 = dispatcher.get_pending_distribution(recipient2);
    let pending3 = dispatcher.get_pending_distribution(recipient3);
    
    assert!(pending1 == 3, "Recipient1 should get 3");
    assert!(pending2 == 3, "Recipient2 should get 3");
    assert!(pending3 == 3, "Recipient3 should get 3");
    
    stop_cheat_caller_address(dispatcher.contract_address);
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    dispatcher.distribute();
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
#[should_panic]
fn test_overflow_check() {
    let (dispatcher, owner) = deploy_contract();
    let recipient1: ContractAddress = starknet::contract_address_const::<'recipient1'>();
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    
    let max_u256: u256 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    dispatcher.add_recipient(recipient1, max_u256);
    
    let recipient2: ContractAddress = starknet::contract_address_const::<'recipient2'>();
    dispatcher.add_recipient(recipient2, 1);
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

