<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emalli Roosa</title>
    <link rel="icon" href="{{ asset('images/emalli-roosa-2048x1064.jpg') }}">
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    <link rel="stylesheet" href="assets/carousel.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="logout-url" content="{{ route('logout') }}">
    <meta name="reset-url" content="{{ route('password.email') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ion-rangeslider@2.3.1/css/ion.rangeSlider.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/ion-rangeslider@2.3.1/js/ion.rangeSlider.min.js"></script>
</head>

<body>
    <div class="top-bar" id="topBar">
        <div class="top-left">
            FREE SHIPPING FOR ALL ORDERS OF $100
        </div>
        <div class="top-right">
            <a href="#" title="Facebook" class="top-social-btn"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/emalli.roosa/" target="_blank" title="Instagram" class="top-social-btn"><i class="fab fa-instagram"></i></a>
        </div>
    </div>

    <!-- DESKTOP HEADER -->
    <div class="header desktop-header" id="header">
        <div class="logo" id="logo">
            <img src="{{ asset('images/emalli_roosa__1_-removebg-preview.png') }}" alt="Emalli Roosa Logo">
        </div>
        <div class="nav-links">
            <a href="#" class="active nav-link" data-target="home-combined">HOME</a>
            <a href="#" class="nav-link" data-target="shop-section">SHOP</a>
            <a href="#" class="nav-link blog-icon" data-target="blog-section">BLOG</a>
            <a href="#" class="nav-link" data-target="about-section">ABOUT US</a>
            <a href="#" class="nav-link" data-target="contact-section">CONTACT US</a>
        </div>
        <div class="header-buttons">
            @if(Auth::check())
            <div class="icon-with-label account-trigger-desktop" style="cursor: pointer;">
                <i class="fas fa-user"></i>
                <span>Hi, {{ Auth::user()->name }}</span>
            </div>
            @else
            <div class="icon-with-label login-trigger">
                <i class="fas fa-user"></i>
                <span>Login</span>
            </div>
            @endif
            <div class="icon-with-label open-search">
                <i class="fas fa-search"></i>
                <span>Search</span>
            </div>
            <div class="icon-with-label open-wishlist">
                <i class="far fa-heart"></i>
                <span>Wishlist</span>
            </div>
            <div class="icon-with-label cart-desktop">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" @if($globalCartCount==0) style="display:none" @endif>{{ $globalCartCount }}</span>
                <span class="cart-label">Cart</span>
            </div>
        </div>
    </div>

    <!-- MOBILE HEADER -->
    <div class="header mobile-header" id="mobile-header">
        <div class="menu-toggle"><i class="fas fa-bars"></i></div>
        <div class="logo" id="logo">
            <img src="{{ asset('images/emalli_roosa__1_-removebg-preview.png') }}" alt="Emalli Roosa Logo">
        </div>
        <div class="header-buttons">
            <a href="#" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" @if($globalCartCount==0) style="display:none" @endif>{{ $globalCartCount }}</span>
            </a>
        </div>
    </div>

    <!-- MOBILE SIDEBAR -->
    <div class="modern-mobile-sidebar" id="mobileSidebar">
        <div class="sidebar-header">
            <input type="text" id="mobileSearchInput" class="search-input" placeholder="Search products...">
            <i id="mobileSearchIcon" class="fas fa-search"></i>
        </div>

        <div class="sidebar-tabs">
            <button class="sidebar-tab active" data-tab="menu"><i class="fas fa-bars"></i> Menu</button>
            <button class="sidebar-tab" data-tab="categories"><i class="fas fa-th-large"></i> Categories</button>
        </div>

        <div class="sidebar-content">
            <div class="sidebar-tab-panel" id="menu-panel">
                <a href="#" class="nav-link" data-target="home-combined"><i class="fas fa-home"></i> Home</a>
                <a href="#" class="nav-link" data-target="shop-section"><i class="fas fa-store"></i> Shop</a>
                <a href="#" class="nav-link blog-icon" data-target="blog-section"><i class="fas fa-blog"></i> Blog</a>
                <a href="#" class="nav-link" data-target="about-section"><i class="fas fa-users"></i> About Us</a>
                <a href="#" class="nav-link" data-target="contact-section"><i class="fas fa-envelope"></i> Contact</a>
                <a href="#" class="open-wishlist"><i class="far fa-heart"></i> Wishlist</a>
                @if(Auth::check())
                <a href="#" class="account-trigger-mobile"><i class="fas fa-user"></i> Welcome, {{ Auth::user()->name }}</a>
                @else
                <a href="#" class="mobile-login-trigger"><i class="fas fa-user"></i> Login / Register</a>
                @endif
            </div>

            <div class="sidebar-tab-panel" id="categories-panel" style="display: none;">
                <p class="coming-soon">Coming Soon...</p>
            </div>
        </div>
    </div>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Section-1 -->
    <div class="slider main-section" id="slider-section">
        <div class="slides">
            <div class="slide active">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Discover Sophistication in Every Drop – Emalli Roosa Perfumes</h1>
                        <p>Emalli Roosa redefines luxury with perfumes crafted from the finest natural ingredients,
                            blending the rich heritage of Spanish fragrances with the deep allure of oud. Each scent is
                            a masterpiece of sophistication, purity, and elegance, designed to leave a lasting
                            impression.</p>
                        <button class="nav-link" data-target="shop-section">Shop Now</button>
                    </div>
                    <div class="slide-image slide-image-1">
                        <img src="{{ asset('images/slider1.png') }}" alt="Slide 1" draggable="false">
                    </div>
                </div>
            </div>
            <div class="slide">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Elevate Your Elegance with Emalli Roosa – Ladies Handbags Now 30% Off!</h1>
                        <p>Discover sophistication in every stitch with Emalli Roosa's exclusive collection of ladies handbags. Designed for the modern woman, our stylish and versatile bags add the perfect finishing touch to any outfit.</p>
                        <button>Shop Now</button>
                    </div>
                    <div class="slide-image slide-image-2">
                        <img src="{{ asset('images/slider2.png') }}" alt="Slide 2" draggable="false">
                    </div>
                </div>
            </div>
            <div class="slide">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Find Your Perfect Pair – Women's Shoes 30% Off at Emalli Roosa!</h1>
                        <p>Step into style with Emalli Roosa’s stunning collection of women’s shoes. From chic heels to
                            comfy flats, we’ve got everything you need to complement your wardrobe. With our 30% off
                            sale, there's never been a better time to treat your feet to the perfect pair. </p>
                        <button>Shop Now</button>
                    </div>
                    <div class="slide-image slide-image-3">
                        <img src="{{ asset('images/slider3.png') }}" alt="Slide 3" draggable="false">
                    </div>
                </div>
            </div>
        </div>

        <!-- Arrows -->
        <div class="slider-nav">
            <span class="prev">&#10094;</span>
            <span class="next">&#10095;</span>
        </div>

        <!-- Dots -->
        <div class="slider-dots"></div>
    </div>

    <!-- Section-2 -->
    <section class="category-section" id="category-section">
        <h2 class="category-title">Explore Emalli Roosa Collections</h2>
        <div class="category-container">

            <!-- Perfumes -->
            <div class="category-card" id="perfumeCard">
                <img src="{{ asset('images/perfume catogory img with bg.png') }}" alt="Perfumes">
                <h3 class="category-name">PERFUMES</h3>
                <p class="product-count">{{ $categoryCounts['perfume'] ?? 0 }} products</p>
            </div>

            <!-- Gents Shoes -->
            <!-- <div class="category-card coming-soon">
                <img src="{{ asset('images/gents shoes catogory img with bg.png') }}" alt="Gents Shoes">
                <h3 class="category-name">GENTS SHOES</h3>
                <p class="product-count">Coming Soon</p>
            </div> -->

            <!-- Ladies Bags -->
            <div class="category-card coming-soon">
                <img src="{{ asset('images/ladies bags catogory img with bg.png') }}" alt="Ladies Bags">
                <h3 class="category-name">LADIES BAGS</h3>
                <p class="product-count">Coming Soon</p>
            </div>

            <!-- Ladies Clothes -->
            <div class="category-card coming-soon">
                <img src="{{ asset('images/ladies clothes catogory img with bg.png') }}" alt="Ladies Clothes">
                <h3 class="category-name">LADIES CLOTHES</h3>
                <p class="product-count">Coming Soon</p>
            </div>

            <!-- Ladies Shoes -->
            <div class="category-card coming-soon">
                <img src="{{ asset('images/ladies shoes catogory img with bg.png') }}" alt="Ladies Shoes">
                <h3 class="category-name">LADIES SHOES</h3>
                <p class="product-count">Coming Soon</p>
            </div>

        </div>
    </section>

    <!-- Section-3 -->
    <!-- Carousel Layout -->
    <div class="carousel" id="perfumeCarouselSection" style="display: none;">
        <div class="list">
            @foreach ($products as $product)
            @if ($product->category === 'perfume')
            <div class="item" data-id="{{ $product->id }}" data-key="{{ $product->slug }}">
                <img src="/{{ $product->image }}" alt="{{ $product->name }}">
                <div class="introduce">
                    <div class="title">{{ ucfirst($product->category) }}</div>
                    <div class="topic">{{ strtoupper($product->name) }}</div>
                    <div class="des">{{ Str::limit($product->description, 120) }}</div>
                    <a class="seeMore magnetic-btn" style="--clr:#c28377; text-decoration: none; background: transparent;">
                        <span style="font-weight: 400;">See More &#8599</span>
                    </a>
                </div>
                <div class="detail">
                    <div class="title">{{ strtoupper($product->name) }}</div>
                    <div class="des">{{ $product->description }}</div>
                    <div class="specifications">
                        <div>
                            <p>Ideal For</p>
                            <p>{{ $product->perfumeDetail->ideal_for ?? '-' }}</p>
                        </div>
                        <div>
                            <p>Fragrance Notes</p>
                            <p>{{ $product->perfumeDetail->fragrance_notes ?? '-' }}</p>
                        </div>
                        <div>
                            <p>Lasting Power</p>
                            <p>12 hours +</p>
                        </div>
                        <div>
                            <p>Bottle Size</p>
                            <p>{{ $product->perfumeDetail->bottle_size ?? '-' }}</p>
                        </div>
                        <div>
                            <p>Concentration</p>
                            <p>{{ $product->perfumeDetail->concentration ?? '-' }}</p>
                        </div>
                    </div>
                    <div class="checkout">
                        <button class="wishlist-btn" data-id="{{ $product->id }}">
                            <i class="{{ in_array($product->id, $wishlistIds) ? 'fas' : 'far' }} fa-heart wishlist-icon"></i>
                        </button>
                        <button class="add-to-cart-btn">ADD TO CART</button>
                        <button class="quick-buy-btn"
                            data-product-id="{{ $product->id }}"
                            data-product-name="{{ $product->name }}"
                            data-product-price="{{ $product->price }}"
                            data-product-image="{{ asset(ltrim($product->image, '/')) }}">
                            QUICK BUY
                        </button>
                    </div>
                    <div class="action-message"></div>
                </div>
            </div>
            @endif
            @endforeach
        </div>

        <div class="arrows">
            <button id="prev">&#10094;</button>
            <button id="next">&#10095;</button>
            <a id="back" class="magnetic-btn" style="--clr:#c28377; text-decoration: none; background: transparent;">
                <span class="mbtn-txt" style="font-weight: 400;">Go Back &#8599</span>
            </a>
        </div>
    </div>

    <!-- Section-4 -->
    <section id="blog-section">
        <div class="blog-container">
            @foreach($posts as $post)
            <article class="blog-post">
                <h2 class="blog-title">{{ $post->title }}</h2>
                <div class="blog-meta">
                    <span><i class="fas fa-user"></i> Admin</span>
                    <span><i class="fas fa-calendar"></i> {{ $post->created_at->format('F d, Y') }}</span>
                    <span><i class="fas fa-comments"></i> 0 Comments</span>
                </div>
                <div class="blog-image">
                    <img src="{{ asset($post->image) }}" alt="{{ $post->title }}">
                </div>
                <div class="blog-excerpt">
                    <p>{{ Str::limit(strip_tags($post->content), 200) }}</p>
                </div>
                <a href="#" class="read-more-btn" data-post-id="{{ $post->id }}">Continue Reading</a>
            </article>
            @endforeach

            @if($posts->isEmpty())
            <p>No posts found.</p>
            @endif
        </div>
    </section>

    <section id="single-post-section" style="display: none;">
        <div class="single-post-container">
            <div class="single-post-content-wrapper">
                <div class="single-post-text">
                    <h1 class="single-post-title"></h1>
                    <div class="single-post-content"></div>
                    <button class="back-to-blog-btn">← Back to Blog</button>
                </div>
                <div class="single-post-image-wrapper">
                    <img class="single-post-image" src="" alt="">
                </div>
            </div>
        </div>
    </section>

    <section class="about-section main-section" id="about-section" style="display: none;">
        <div class="about-banner-wrapper">
            <img src="{{ asset('images/aboutus-perfume edited.png') }}" alt="About Banner for Emalli Roosa" class="about-banner-img">
        </div>
        <div class="container">
            <h1 class="about-main-heading">About US</h1>
            <div class="about-block">
                <h2 class="section-title">Where Elegance Meets Timeless Craftsmanship</h2>
                <p>At <strong>Emalli Roosa</strong>, we are more than just a shoe brand—we are a celebration of
                    elegance, quality, and the timeless allure of Spanish craftsmanship.</p>
                <p>Every step you take with Emalli Roosa is a journey into the rich heritage of artisanal shoemaking,
                    where tradition meets modern sophistication. Our passion lies in delivering <strong>exquisite,
                        handcrafted footwear</strong> that blends <strong>style</strong>, <strong>comfort</strong>, and
                    <strong>durability</strong>.
                </p>
            </div>

            <div class="about-block">
                <h2 class="section-title">Bringing Spain to Your Doorstep</h2>
                <p>Inspired by vibrant Spanish culture and meticulous craftsmanship, our footwear captures the essence
                    of <strong>luxury and authenticity</strong>. Whether you're heading to a meeting or attending a
                    special occasion, Emalli Roosa ensures <strong>every step is an elegant statement</strong>.</p>
            </div>

            <div class="about-block">
                <h2 class="section-title">Our Commitment</h2>
                <ul class="commitment-list">
                    <li><span class="icon">🛡️</span> <strong>Uncompromising Quality</strong> – Premium materials &
                        expert craftsmanship</li>
                    <li><span class="icon">🎨</span> <strong>Timeless Designs</strong> – Footwear that transcends trends
                    </li>
                    <li><span class="icon">🌐</span> <strong>Global Elegance</strong> – Spanish artistry, accessible
                        worldwide</li>
                </ul>
                <p>Join us as we bring the essence of Spain to your doorstep—<strong>one elegant step at a
                        time</strong>.</p>
                <p class="about-footer-cta"><span class="emoji">✨</span>Step into sophistication with Emalli Roosa.</p>
            </div>
        </div>
    </section>

    <section class="contact-section main-section" id="contact-section" style="display: none;">
        <h2>Get In Touch</h2>
        <form class="contact-form" method="POST" action="{{ route('contact.submit') }}">
            @csrf
            <label for="name">Your Name</label>
            <input type="text" name="name" id="name" placeholder="Enter your name" required>

            <label for="email">Your Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your email" required>

            <label for="message">Your Message</label>
            <textarea name="message" id="message" rows="5" placeholder="Type your message" required></textarea>

            <button type="submit">Send Message</button>
        </form>
        @if(session('contact_success'))
        <div class="contact-success-block">
            <div class="form-success" id="contact-success">{{ session('contact_success') }}</div>
        </div>
        @endif
    </section>

    <section id="search-section" class="search-below-header" style="display: none;">
        <h1 class="search-title-heading">Find Your Signature Product</h1>
        <div class="search-header-bar">
            <input type="text" id="productSearchInput" placeholder="Search products...">
            <button id="closeSearchBtn" title="Close Search">&times;</button>
        </div>
        <div id="searchResults" class="search-results-grid">
            <!-- Search results load here -->
        </div>
    </section>

    <section id="shop-section" style="display: none;">
        @include('shop')
    </section>

    <section id="wishlist-section" style="display: none;">
        @include('wishlist')
    </section>

    <section id="cart-section" style="display: none;">
        @include('cart')
    </section>

    <section id="checkout-section" style="display:none;">
        @include('checkout')
    </section>

    <footer class="emalli-footer">
        <div class="footer-content">
            <!-- Left Side -->
            <div class="footer-left">
                <img src="{{ asset('images/emalli_roosa__1_-removebg-preview.png') }}" alt="Emalli Roosa Logo" class="footer-logo">
                <p>
                    Where Luxury Meets Purity – Emalli Roosa,<br>
                    crafting comfort and confidence in every step.
                </p>

                <div class="newsletter-section">
                    <h4>Subscribe to our Newsletter</h4>
                    <p>Get the latest updates on new arrivals, special offers, and more.</p>
                    <form class="newsletter-form" method="POST" action="{{ route('newsletter.submit') }}">
                        @csrf
                        <input type="email" name="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                    @if(session('newsletter_success'))
                    <div class="footer-success" id="newsletter-success">{{ session('newsletter_success') }}</div>
                    @endif
                </div>
            </div>

            <!-- Right Side -->
            <div class="footer-right">
                <div class="footer-contact">
                    <div class="footer-item">
                        <i class="far fa-paper-plane"></i>
                        <span>2906 Williams Grant St Sugar Land TX 77479 USA</span>
                    </div>
                    <div class="footer-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>+13468294751</span>
                    </div>
                    <div class="footer-item email-group">
                        <i class="fas fa-envelope"></i>
                        <div class="email-lines">
                            <a href="mailto:info@emalliroosa.com">
                                <span>info@emalliroosa.com</span>
                            </a>
                            <span class="mail-txt">
                                Become a reseller – use this:
                            </span>
                            <a href="mailto:sales@emalliroosa.com">
                                <span>sales@emalliroosa.com</span>
                            </a>
                        </div>
                    </div>
                    <div class="footer-social-modern">
                        <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/emalli.roosa/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2025 Emalli Roosa. All rights reserved.</p>
        </div>
    </footer>

    <div class="mobile-bottom-tab">
        <a href="#" class="nav-link" data-target="shop-section"><i class="fas fa-store"></i><span>Shop</span></a>
        <a href="#" class="open-wishlist"><i class="far fa-heart"></i><span>Wishlist</span></a>
        <a href="#"><i class="fas fa-shopping-cart"></i><span>Cart</span></a>
        @if(Auth::check())
        <a href="#" class="account-trigger-mobile"><i class="far fa-user"></i><span>{{ Auth::user()->name }}</span></a>
        @else
        <a href="#" class="mobile-login-trigger"><i class="far fa-user"></i><span>Login</span></a>
        @endif
    </div>

    <!-- LOGIN SIDEBAR -->
    <div class="login-sidebar" id="loginSidebar">
        <div class="login-sidebar-header">
            <h2>Sign In</h2>
            <span id="closeLoginSidebar">&times;</span>
        </div>
        <form class="login-form" method="POST" action="{{ route('login') }}">
            @csrf
            <label>Email or Username</label>
            <input type="email" name="email" placeholder="Enter your email" required>

            <label for="loginPassword">Password</label>
            <div class="password-wrapper">
                <input type="password" name="password" id="loginPassword" placeholder="Enter password" required>
                <i class="fas fa-eye toggle-password" data-target="#loginPassword"></i>
            </div>

            <div class="login-options">
                <div class="remember-me">
                    <input type="checkbox" id="rememberMe" name="remember">
                    <label for="rememberMe">Remember me</label>
                </div>
                <a href="#" id="forgotPasswordLink">Forgot password?</a>
            </div>

            <button type="submit" class="login-btn" id="loginBtn">
                <span class="btn-text">Login</span>
                <span class="loader" style="display:none;"></span>
            </button>

            @if (session('status'))
            <script>
                alert("{{ session('status') }}");
            </script>
            @endif

            <div class="register-redirect">
                <p>New to Emalli Roosa?</p>
                <a href="#" id="openRegisterFromSidebar">Create an Account</a>
            </div>
        </form>
        <!-- Forgot Password Form (Hidden by default) -->
        <div class="forgot-password-form" style="display: none;">
            <h3 class="section-title">Reset Your Password</h3>

            <!-- This is the success message placeholder -->
            <div class="reset-success" style="display: none; margin-bottom: 15px;">
                <p style="color: green; font-weight: 500; margin-bottom: 5px;" id="reset-success-msg"></p>
                <p style="color: #444; font-size: 13px;" id="reset-success-hint">Please check your email inbox to continue the password reset process.</p>
            </div>

            <form id="forgotPasswordForm">
                <input type="email" id="resetEmail" name="email" required placeholder="Enter your email">
                <button type="submit" class="login-btn" id="resetBtn" style="position: relative;">
                    <span class="btn-text">Send Reset Link</span>
                    <span class="loader" style="display: none;"></span>
                </button>

                <div class="back-to-login">
                    <a href="#" id="backToLogin">← Back to Login</a>
                </div>
            </form>
        </div>

        <!-- Password Reset Form (Hidden by default) -->
        <div class="new-password-form" style="display: none;">
            <h3 class="section-title">Set New Password</h3>
            <form method="POST" action="{{ route('password.update') }}" class="reset-password-form">
                @csrf
                <input type="hidden" name="token" id="resetTokenInput">

                <div class="form-group">
                    <input type="email" name="email" id="resetEmailInput" placeholder="Your email" class="form-control" required>
                </div>

                <div class="form-group password-group">
                    <input type="password" id="resetNewPassword" name="password" required>
                    <label>New Password</label>
                    <i class="fas fa-eye toggle-password" data-target="#resetNewPassword"></i>
                </div>

                <div class="form-group password-group">
                    <input type="password" id="resetConfirmPassword" name="password_confirmation" required>
                    <label>Confirm Password</label>
                    <i class="fas fa-eye toggle-password" data-target="#resetConfirmPassword"></i>
                </div>

                <button type="submit" class="login-btn">Reset Password</button>
            </form>
        </div>
    </div>
    <div class="login-overlay" id="loginOverlay"></div>

    <!-- REGISTER PAGE -->
    <div class="register-fullscreen-modern" id="registerFullscreen">
        <div class="register-modern-card">
            <span id="closeRegisterFullscreen" class="close-btn">&times;</span>
            <h2 class="register-title">Create Account</h2>
            <form class="register-form" id="registerForm">
                <div class="form-group">
                    <input type="text" id="regName" name="name" required>
                    <label>Full Name</label>
                </div>

                <div class="form-group">
                    <input type="email" id="regEmail" name="email" required>
                    <label>Email Address</label>
                </div>

                <div class="form-group password-group">
                    <input type="password" id="regPassword" name="password" required>
                    <label>Password</label>
                    <i class="fas fa-eye toggle-password" data-target="#regPassword"></i>
                </div>

                <div class="form-group password-group">
                    <input type="password" id="regConfirmPassword" name="password_confirmation" required>
                    <label>Confirm Password</label>
                    <i class="fas fa-eye toggle-password" data-target="#regConfirmPassword"></i>
                </div>

                <button type="submit" class="register-btn">Register</button>

                <div class="login-switch">
                    <p>Already a member?</p>
                    <a href="#" id="openLoginFromRegister">Sign In</a>
                </div>
            </form>
        </div>
    </div>

    <!-- ACCOUNT SIDEBAR -->
    <div class="account-sidebar" id="accountSidebar">
        <div class="account-header">
            <h2>My Account</h2>
            <span class="close-account-sidebar" id="closeAccountSidebar">&times;</span>
        </div>

        @auth
        <div class="account-content">
            <p><strong>Name:</strong> {{ Auth::user()->name }}</p>
            <p><strong>Email:</strong> {{ Auth::user()->email }}</p>

            @if(Auth::user()->is_admin)
            <div class="admin-links">
                <h4 style="margin-bottom: 10px;">Admin Panel</h4>
                <a href="{{ route('admin.newsletters') }}" class="admin-btn">
                    📧 Newsletter Subscriptions
                </a>
                <a href="{{ route('admin.contacts') }}" class="admin-btn">
                    🗨️ Contact Messages
                </a>
            </div>
            @endif

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </form>
        </div>
        @endauth
    </div>

    <script>
        const resetToken = "{{ $resetToken ?? '' }}";
        const emailFromServer = "{{ $email ?? '' }}";
    </script>

    <script src="{{ asset('script.js') }}"></script>
    <script>
        window.isLoggedIn = "{{ auth()->check() ? 'true' : 'false' }}";
    </script>

</body>

</html>