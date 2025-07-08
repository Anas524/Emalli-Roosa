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
                <input type="checkbox" class="category-filter" value="perfume" checked>
                <span class="checkmark"></span>
                Perfume
            </label>
            <label class="custom-checkbox">
                <input type="checkbox" class="category-filter" value="ladies-bags">
                <span class="checkmark"></span>
                Ladies Bags
            </label>
            <label class="custom-checkbox">
                <input type="checkbox" class="category-filter" value="ladies-clothes">
                <span class="checkmark"></span>
                Ladies Clothes
            </label>
            <label class="custom-checkbox">
                <input type="checkbox" class="category-filter" value="ladies-shoes">
                <span class="checkmark"></span>
                Ladies Shoes
            </label>

            <h3>Filter by Price</h3>
            <div class="price-slider">
                <input type="text" id="priceRange" name="priceRange" />
                <div class="price-values">
                    <span id="minPriceVal">$0</span> – <span id="maxPriceVal">$150</span>
                </div>
            </div>

            <button id="clearFiltersBtn" class="clear-filters-btn">Clear Filters</button>
        </div>

        <div class="shop-products">
            @if(isset($products) && count($products))
            @foreach ($products as $product)
            <div class="shop-card" data-id="{{ $product->id }}" data-category="{{ $product->category }}" data-price="{{ $product->price }}" data-key="{{ $product->slug }}">
                <img src="/{{ $product->image }}" alt="{{ $product->name }}">
                <div class="shop-info">
                    <div class="shop-title">
                        <h4>{{ $product->name }}</h4>
                        <i class="{{ in_array($product->id, $wishlistIds) ? 'fas' : 'far' }} fa-heart wishlist-icon"></i>
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