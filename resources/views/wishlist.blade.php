<h2>My Wishlist</h2>
<div id="wishlist-items">
    <div class="wishlist-products">
        @forelse ($wishlist as $item)
        <div class="wishlist-card" data-id="{{ $item->product->id }}">
            <img src="/{{ $item->product->image }}" alt="{{ $item->product->name }}">
            <div class="wishlist-info">
                <div class="wishlist-title">
                    <h4>{{ $item->product->name }}</h4>
                    <button class="remove-wishlist-btn" data-id="{{ $item->product->id }}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p>{{ \Illuminate\Support\Str::limit($item->product->description, 60) }}</p>
                <strong>${{ $item->product->price }}</strong>
                <div class="wishlist-actions">
                    <button class="add-to-cart-btn">Add to Cart</button>
                    <button class="quick-buy-btn">Quick Buy</button>
                </div>
            </div>
        </div>
        @empty
        <div class="empty-wishlist">
            <img src="{{ asset('images/empty-cart-illustration.png') }}" alt="Empty Wishlist Illustration" class="empty-wishlist-img">
            <h3>Your Wishlist is Currently Empty</h3>
            <p>It looks like you haven’t saved any favorites yet. Browse our products and add items to your wishlist to keep track of things you love!</p>
            <button onclick="showSection('shop-section')" class="browse-btn">Start Shopping</button>
        </div>
        @endforelse
    </div>
</div>