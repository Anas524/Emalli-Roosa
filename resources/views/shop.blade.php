<div class="shop-overlay-section">
    <div class="shop-header">
        <h2>Shop</h2>
        <div class="shop-controls">
            <button id="toggleFiltersBtn">Filters</button>
            <select id="sortProducts">
                <option value="default">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
            </select>
        </div>
    </div>

    <div class="shop-body">
        <div class="shop-filters" id="shopFilters">
            <h3>Product Categories</h3>
            <label class="custom-checkbox">
                <input type="checkbox" id="filterPerfume" checked>
                <span class="checkmark"></span>
                Perfume
            </label>

            <h3>Filter by Price</h3>
            <div class="price-slider">
                <input type="text" id="priceRange" name="priceRange" />
                <div class="price-values">
                    <span id="minPriceVal">$0</span> – <span id="maxPriceVal">$810</span>
                </div>
            </div>

            <button id="clearFiltersBtn" class="clear-filters-btn">Clear Filters</button>
        </div>

        <div class="shop-products">
            @if(isset($products) && count($products))
                @foreach ($products as $product)
                <div class="shop-card" data-key="{{ $product->slug }}">
                    <img src="/{{ $product->image }}" alt="{{ $product->name }}">
                    <div class="shop-info">
                        <div class="shop-title">
                            <h4>{{ $product->name }}</h4>
                            <i class="far fa-heart wishlist-icon"></i>
                        </div>
                        <p>{{ \Illuminate\Support\Str::limit($product->description, 60) }}</p>
                        <strong>${{ $product->price }}</strong>
                        <div class="action-message"></div>
                    </div>
                </div>
                @endforeach
            @else
                <p>No products available.</p>
            @endif
        </div>
    </div>
</div>