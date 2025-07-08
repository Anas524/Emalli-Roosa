<div class="wishlist-overlay-section" id="wishlist-section">
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
            <p>You have no items in your wishlist.</p>
            @endforelse
        </div>
    </div>
</div>