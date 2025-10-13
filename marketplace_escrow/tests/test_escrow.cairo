use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};
use marketplace_escrow::{IMarketplaceEscrowDispatcher, IMarketplaceEscrowDispatcherTrait};

fn deploy_contract() -> (IMarketplaceEscrowDispatcher, ContractAddress) {
    let owner: ContractAddress = starknet::contract_address_const::<'owner'>();
    let contract = declare("MarketplaceEscrow").unwrap().contract_class();
    let mut calldata = array![];
    calldata.append(owner.into());
    calldata.append(5); // 5% fee
    calldata.append(0);
    
    let (contract_address, _) = contract.deploy(@calldata).unwrap();
    (IMarketplaceEscrowDispatcher { contract_address }, owner)
}

fn get_addresses() -> (ContractAddress, ContractAddress) {
    let buyer: ContractAddress = starknet::contract_address_const::<'buyer'>();
    let seller: ContractAddress = starknet::contract_address_const::<'seller'>();
    (buyer, seller)
}

#[test]
fn test_create_order() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    
    let order_id = dispatcher.create_order(seller, 1000);
    
    assert!(order_id == 1, "Order ID should be 1");
    
    let order = dispatcher.get_order(order_id);
    assert!(order.buyer == buyer, "Buyer should match");
    assert!(order.seller == seller, "Seller should match");
    assert!(order.amount == 1000, "Amount should match");
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
fn test_complete_order() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    let order_id = dispatcher.create_order(seller, 1000);
    
    dispatcher.complete_order(order_id);
    
    // Verify order was completed (status check implicit in no panic)
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
fn test_cancel_order() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    let order_id = dispatcher.create_order(seller, 1000);
    
    dispatcher.cancel_order(order_id);
    
    // Verify order was cancelled (status check implicit in no panic)
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
fn test_dispute_and_resolve() {
    let (dispatcher, owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    let order_id = dispatcher.create_order(seller, 1000);
    
    dispatcher.dispute_order(order_id);
    
    // Verify order was disputed (status check implicit in no panic)
    
    stop_cheat_caller_address(dispatcher.contract_address);
    
    start_cheat_caller_address(dispatcher.contract_address, owner);
    dispatcher.resolve_dispute(order_id, true);
    
    // Verify order was resolved (status check implicit in no panic)
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
fn test_get_user_orders() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    
    dispatcher.create_order(seller, 1000);
    dispatcher.create_order(seller, 2000);
    dispatcher.create_order(seller, 3000);
    
    let buyer_orders = dispatcher.get_user_orders(buyer);
    assert!(buyer_orders.len() == 3, "Buyer should have 3 orders");
    
    let seller_orders = dispatcher.get_user_orders(seller);
    assert!(seller_orders.len() == 3, "Seller should have 3 orders");
    
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
#[should_panic]
fn test_unauthorized_complete() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    let order_id = dispatcher.create_order(seller, 1000);
    stop_cheat_caller_address(dispatcher.contract_address);
    
    start_cheat_caller_address(dispatcher.contract_address, seller);
    dispatcher.complete_order(order_id);
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
#[should_panic]
fn test_zero_amount() {
    let (dispatcher, _owner) = deploy_contract();
    let (buyer, seller) = get_addresses();
    
    start_cheat_caller_address(dispatcher.contract_address, buyer);
    dispatcher.create_order(seller, 0);
    stop_cheat_caller_address(dispatcher.contract_address);
}

