@if($cartItems->count())
    <div class="cart-container">
        <div class="cart-content">
            <div class="cart-header-row">
                <div class="header-cell"></div> <!-- For Remove button -->
                <div class="header-cell"></div> <!-- For Image -->
                <div class="header-cell">Product</div>
                <div class="header-cell">Price</div>
                <div class="header-cell">Quantity</div>
                <div class="header-cell">Subtotal</div>
            </div>
            <div class="cart-items">
                @foreach($cartItems as $item)
                <div class="cart-item" data-id="{{ $item->product->id }}">
                    <button class="remove-item">&times;</button>
                    <div class="item-image">
                        <img src="{{ asset(ltrim($item->product->image, '/')) }}" alt="{{ $item->product->name }}">
                    </div>
                    <div class="item-name">{{ $item->product->name }}</div>
                    <div class="item-price">${{ number_format($item->product->price, 2) }}</div>
                    <div class="item-quantity">
                        <input type="number" value="{{ $item->quantity }}" min="1">
                    </div>
                    <div class="item-subtotal">${{ number_format($item->product->price * $item->quantity, 2) }}</div>
                </div>
                @endforeach
            </div>
        </div>
        <div class="cart-summary">
            <h2>Cart Totals</h2>
            <div class="summary-row">
                <span>Subtotal</span>
                <span class="cart-subtotal">${{ number_format($subtotal, 2) }}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Flat rate: ${{ number_format($shipping, 2) }}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span class="cart-total">${{ number_format($subtotal + $shipping, 2) }}</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>
@else
    <div class="empty-cart">
        <img src="{{ asset('images/empty-cart-illustration.png') }}" alt="Empty Cart Illustration" style="max-width:200px;margin:0 auto 20px;">
        <h2>Your Cart is Currently Empty</h2>
        <p>Looks like you haven't added anything yet. Start exploring our collections and find something you love!</p>
        <button class="return-shop-btn">Browse Products</button>
    </div>
@endif