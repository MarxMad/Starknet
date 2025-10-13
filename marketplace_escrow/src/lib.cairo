use starknet::ContractAddress;

#[derive(Drop, Copy, Serde, starknet::Store)]
pub enum OrderStatus {
    #[default]
    Created,
    Completed,
    Cancelled,
    Disputed,
    Resolved
}

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Order {
    pub order_id: u256,
    pub buyer: ContractAddress,
    pub seller: ContractAddress,
    pub amount: u256,
    pub status: OrderStatus,
    pub created_at: u64,
}

#[starknet::interface]
pub trait IMarketplaceEscrow<TContractState> {
    fn create_order(
        ref self: TContractState, seller: ContractAddress, amount: u256
    ) -> u256;
    fn complete_order(ref self: TContractState, order_id: u256);
    fn cancel_order(ref self: TContractState, order_id: u256);
    fn dispute_order(ref self: TContractState, order_id: u256);
    fn resolve_dispute(ref self: TContractState, order_id: u256, release_to_seller: bool);
    fn get_order(self: @TContractState, order_id: u256) -> Order;
    fn get_user_orders(self: @TContractState, user: ContractAddress) -> Array<u256>;
    fn withdraw_fees(ref self: TContractState);
}

#[starknet::contract]
pub mod MarketplaceEscrow {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use core::num::traits::Zero;
    use core::num::traits::CheckedAdd;
    use core::num::traits::CheckedSub;
    use core::num::traits::CheckedMul;
    use openzeppelin_access::ownable::OwnableComponent;
    use super::{Order, OrderStatus};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        next_order_id: u256,
        orders: Map<u256, Order>,
        user_orders: Map<(ContractAddress, u64), u256>,
        user_order_count: Map<ContractAddress, u64>,
        platform_fee_percent: u256,
        accumulated_fees: u256,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        OrderCreated: OrderCreated,
        OrderCompleted: OrderCompleted,
        OrderCancelled: OrderCancelled,
        OrderDisputed: OrderDisputed,
        DisputeResolved: DisputeResolved,
        FeesWithdrawn: FeesWithdrawn,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrderCreated {
        pub order_id: u256,
        pub buyer: ContractAddress,
        pub seller: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrderCompleted {
        pub order_id: u256,
        pub seller: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrderCancelled {
        pub order_id: u256,
        pub buyer: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrderDisputed {
        pub order_id: u256,
        pub disputed_by: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    pub struct DisputeResolved {
        pub order_id: u256,
        pub released_to_seller: bool,
    }

    #[derive(Drop, starknet::Event)]
    pub struct FeesWithdrawn {
        pub amount: u256,
        pub withdrawn_by: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, fee_percent: u256) {
        self.ownable.initializer(owner);
        self.next_order_id.write(1);
        self.platform_fee_percent.write(fee_percent);
        self.accumulated_fees.write(0);
    }

    #[abi(embed_v0)]
    impl MarketplaceEscrowImpl of super::IMarketplaceEscrow<ContractState> {
        fn create_order(
            ref self: ContractState, seller: ContractAddress, amount: u256
        ) -> u256 {
            let buyer = get_caller_address();
            assert!(!seller.is_zero(), "Invalid seller address");
            assert!(seller != buyer, "Buyer cannot be seller");
            assert!(amount > 0, "Amount must be greater than 0");

            let order_id = self.next_order_id.read();

            let order = Order {
                order_id,
                buyer,
                seller,
                amount,
                status: OrderStatus::Created,
                created_at: get_block_timestamp(),
            };

            self.orders.entry(order_id).write(order);

            // Add to buyer's orders
            let buyer_order_count = self.user_order_count.entry(buyer).read();
            self.user_orders.entry((buyer, buyer_order_count)).write(order_id);
            self.user_order_count.entry(buyer).write(buyer_order_count + 1);

            // Add to seller's orders
            let seller_order_count = self.user_order_count.entry(seller).read();
            self.user_orders.entry((seller, seller_order_count)).write(order_id);
            self.user_order_count.entry(seller).write(seller_order_count + 1);

            // Increment order ID
            let next_id = order_id.checked_add(1);
            assert!(next_id.is_some(), "Order ID overflow");
            self.next_order_id.write(next_id.unwrap());

            self
                .emit(
                    Event::OrderCreated(OrderCreated { order_id, buyer, seller, amount })
                );

            order_id
        }

        fn complete_order(ref self: ContractState, order_id: u256) {
            let caller = get_caller_address();
            let mut order = self.orders.entry(order_id).read();

            assert!(order.order_id != 0, "Order does not exist");
            assert!(caller == order.buyer, "Only buyer can complete order");

            match order.status {
                OrderStatus::Created => {},
                OrderStatus::Disputed => {},
                _ => {
                    panic!("Order cannot be completed in current status");
                }
            }

            // Calculate platform fee
            let fee_percent = self.platform_fee_percent.read();
            let fee_amount_option = order.amount.checked_mul(fee_percent);
            assert!(fee_amount_option.is_some(), "Fee calculation overflow");
            let fee_amount = fee_amount_option.unwrap() / 100;

            // Calculate seller amount
            let seller_amount_option = order.amount.checked_sub(fee_amount);
            assert!(seller_amount_option.is_some(), "Seller amount underflow");
            let seller_amount = seller_amount_option.unwrap();

            // Accumulate fees
            let current_fees = self.accumulated_fees.read();
            let new_fees = current_fees.checked_add(fee_amount);
            assert!(new_fees.is_some(), "Fees overflow");
            self.accumulated_fees.write(new_fees.unwrap());

            // Store seller address before updating order
            let seller = order.seller;

            // Update order status
            order.status = OrderStatus::Completed;
            self.orders.entry(order_id).write(order);

            self
                .emit(
                    Event::OrderCompleted(
                        OrderCompleted { order_id, seller, amount: seller_amount }
                    )
                );
        }

        fn cancel_order(ref self: ContractState, order_id: u256) {
            let caller = get_caller_address();
            let mut order = self.orders.entry(order_id).read();

            assert!(order.order_id != 0, "Order does not exist");
            assert!(
                caller == order.buyer || caller == order.seller, "Only buyer or seller can cancel"
            );

            match order.status {
                OrderStatus::Created => {},
                _ => {
                    panic!("Order cannot be cancelled in current status");
                }
            }

            // Store buyer and amount before updating order
            let buyer = order.buyer;
            let amount = order.amount;

            order.status = OrderStatus::Cancelled;
            self.orders.entry(order_id).write(order);

            self
                .emit(
                    Event::OrderCancelled(
                        OrderCancelled { order_id, buyer, amount }
                    )
                );
        }

        fn dispute_order(ref self: ContractState, order_id: u256) {
            let caller = get_caller_address();
            let mut order = self.orders.entry(order_id).read();

            assert!(order.order_id != 0, "Order does not exist");
            assert!(
                caller == order.buyer || caller == order.seller, "Only buyer or seller can dispute"
            );

            match order.status {
                OrderStatus::Created => {},
                _ => {
                    panic!("Order cannot be disputed in current status");
                }
            }

            order.status = OrderStatus::Disputed;
            self.orders.entry(order_id).write(order);

            self.emit(Event::OrderDisputed(OrderDisputed { order_id, disputed_by: caller }));
        }

        fn resolve_dispute(
            ref self: ContractState, order_id: u256, release_to_seller: bool
        ) {
            self.ownable.assert_only_owner();

            let mut order = self.orders.entry(order_id).read();

            assert!(order.order_id != 0, "Order does not exist");

            match order.status {
                OrderStatus::Disputed => {},
                _ => {
                    panic!("Only disputed orders can be resolved");
                }
            }

            if release_to_seller {
                // Calculate fee and release to seller
                let fee_percent = self.platform_fee_percent.read();
                let fee_amount = (order.amount * fee_percent) / 100;

                let current_fees = self.accumulated_fees.read();
                self.accumulated_fees.write(current_fees + fee_amount);
            }

            order.status = OrderStatus::Resolved;
            self.orders.entry(order_id).write(order);

            self.emit(Event::DisputeResolved(DisputeResolved { order_id, released_to_seller: release_to_seller }));
        }

        fn get_order(self: @ContractState, order_id: u256) -> Order {
            let order = self.orders.entry(order_id).read();
            assert!(order.order_id != 0, "Order does not exist");
            order
        }

        fn get_user_orders(self: @ContractState, user: ContractAddress) -> Array<u256> {
            let mut orders = array![];
            let count = self.user_order_count.entry(user).read();

            let mut i: u64 = 0;
            while i < count {
                let order_id = self.user_orders.entry((user, i)).read();
                orders.append(order_id);
                i += 1;
            };

            orders
        }

        fn withdraw_fees(ref self: ContractState) {
            self.ownable.assert_only_owner();

            let amount = self.accumulated_fees.read();
            assert!(amount > 0, "No fees to withdraw");

            self.accumulated_fees.write(0);

            let caller = get_caller_address();
            self.emit(Event::FeesWithdrawn(FeesWithdrawn { amount, withdrawn_by: caller }));
        }
    }
}
