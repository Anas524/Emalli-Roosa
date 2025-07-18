<div class="checkout-container">
    <h1 class="checkout-title">Checkout</h1>

    <form id="checkout-form" action="{{ route('checkout.submit') }}" method="POST">
        <div class="checkout-grid">
            <!-- Billing Details -->
            <div class="billing-details">
                <h2>Billing Details</h2>

                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>

                <label for="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" required>

                <label for="address">Address</label>
                <textarea id="address" name="address" rows="3" required></textarea>

                <label for="city">City</label>
                <input type="text" id="city" name="city" required>

                <label for="zip">Postal Code</label>
                <input type="text" id="zip" name="zip" required>

                <label for="country">Country</label>
                <input type="text" id="country" name="country" required>
            </div>

            <!-- Order Summary -->
            <div class="order-summary">
                <h2>Your Order</h2>
                <div class="order-items">
                    @foreach($cartItems as $item)
                    <div class="order-item">
                        <span>{{ $item->product->name }} × {{ $item->quantity }}</span>
                        <span>${{ number_format($item->product->price * $item->quantity, 2) }}</span>
                    </div>
                    @endforeach
                    <div class="order-item">
                        <span>Shipping</span>
                        <span>$5.00</span>
                    </div>
                </div>
                <div class="order-total">
                    <strong>Total:</strong>
                    <strong class="quick-buy-grand-total">${{ number_format($subtotal + 5, 2) }}</strong> <!-- assuming flat shipping -->
                </div>

                <h3>Payment Method</h3>
                <div class="payment-methods">
                    <label>
                        <input type="radio" name="payment_method" value="bank" checked>
                        Direct Bank Transfer
                    </label>
                    <div class="payment-info" style="display:block;">
                        <p>Make your payment directly into our bank account. Use your Order ID as payment reference. Your order won’t be shipped until funds have cleared.</p>
                    </div>

                    <label>
                        <input type="radio" name="payment_method" value="check">
                        Check Payments
                    </label>
                    <div class="payment-info" style="display:none;">
                        <p>Please send a check to our office address. We will process your order once the check has cleared.</p>
                    </div>

                    <label>
                        <input type="radio" name="payment_method" value="cod">
                        Cash on Delivery
                    </label>
                    <div class="payment-info" style="display:none;">
                        <p>Pay with cash upon delivery.</p>
                    </div>
                </div>
            </div>

            <!-- Hidden Quick Buy Quantity (set dynamically in JS if quick buy is used) -->
            <input type="hidden" name="quick_buy_quantity" value="1">

            <button type="submit" class="place-order-btn">Place Order</button>
    </form>
</div>