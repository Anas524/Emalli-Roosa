const allSections = [
    '#slider-section',
    '#about-section',
    '#category-section',
    '#perfumeCarouselSection',
    '#contact-section',
    '#search-section',
    '#shop-section',
    '#wishlist-section',
    '#cart-section',
    '#checkout-section',
    '#blog-section',
    '#single-post-section'
];

function showSection(sectionId, scrollToTop = true) {
    // Hide everything
    $(allSections.join(',')).hide();

    if (sectionId === 'home-combined') {
        $('#slider-section, #category-section').fadeIn(300);
        if (scrollToTop) {
            $('html, body').animate({ scrollTop: $('#slider-section').offset().top - 60 }, 400);
        }
        return;
    }

    const $target = $('#' + sectionId);
    if ($target.length) {
        $target.fadeIn(300, function () {
            if (scrollToTop) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 60
                }, 400);
            }
        });

    }
}

// GLOBAL CSRF setup (outside ready)
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > 0) {
            $('#topBar').slideUp(200);
            $('#header').css('top', '0');
            $('#mobile-header').css('top', '0');
        } else {
            $('#topBar').slideDown(200, function () {
                $('#header').css('top', '50px');
                $('#mobile-header').css('top', '50px');
            });
        }

        if (scrollTop > 40) {
            $('#logo').addClass('shrink');
        } else {
            $('#logo').removeClass('shrink');
        }

        adjustSliderHeight();
    });

    $(document).ready(adjustSliderHeight);
    $(window).on('resize', adjustSliderHeight);

    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;
    let startX = 0;
    let isDragging = false;

    function showSlide(index) {
        $('.slides').css('transform', 'translateX(-' + (index * 100) + '%)');
        $('.slider-dots span').removeClass('active').eq(index).addClass('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    $('.next').click(nextSlide);
    $('.prev').click(prevSlide);

    // Create dots dynamically
    for (let i = 0; i < totalSlides; i++) {
        $('.slider-dots').append('<span></span>');
    }

    $('.slider-dots span').click(function () {
        currentIndex = $(this).index();
        showSlide(currentIndex);
    });

    // Drag functionality
    $('.slides').on('mousedown touchstart', function (e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
    });

    $(document).on('mouseup touchend', function (e) {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.pageX || e.originalEvent.changedTouches[0].pageX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentIndex = (currentIndex + 1) % totalSlides;
            } else {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }
            showSlide(currentIndex);
        }
    });

    $(document).on('mousemove touchmove', function (e) {
        if (!isDragging) return;
        e.preventDefault(); // prevent scrolling while dragging
    });

    showSlide(0);
    setInterval(nextSlide, 9000); // auto-slide every 9s

    // toggle visibility and nav state for both Desktop and Mobile
    $('.nav-link').click(function (e) {
        e.preventDefault();
        const targetId = $(this).data('target');
        if (!targetId) return;

        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        showSection(targetId);

        $('#mobileSidebar').removeClass('active');
        $('#sidebarOverlay').fadeOut();
    });

    $('.menu-toggle').on('click', function () {
        $('#mobileSidebar').addClass('active');
        $('#sidebarOverlay').fadeIn();
    });

    $('#sidebarOverlay').on('click', function () {
        $('#mobileSidebar').removeClass('active');
        $('#sidebarOverlay').fadeOut();
    });

    $('.sidebar-tab').click(function () {
        $('.sidebar-tab').removeClass('active');
        $(this).addClass('active');

        const tab = $(this).data('tab');
        $('.sidebar-tab-panel').hide();
        $(`#${tab}-panel`).fadeIn();
    });


    // Open login sidebar
    $('.header-buttons a:contains("LOGIN"), .sidebar-tab-panel a:contains("Login"), .login-trigger').click(function (e) {
        e.preventDefault();
        $('#loginSidebar').addClass('active');
        $('#loginOverlay').addClass('active');
    });

    // Close login sidebar when clicking close icon or overlay
    $('#closeLoginSidebar, #loginOverlay').click(function () {
        $('#loginSidebar').removeClass('active');
        $('#loginOverlay').removeClass('active');
    });

    // Toggle password visibility
    $('.toggle-password').on('click', function () {
        const input = $($(this).data('target'));
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);

        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    let $carousel = $('.carousel');
    let $listHTML = $('.carousel .list');
    let unAcceptClick;

    // Next button click event
    $('#next').on('click', function () {
        showSlider('next');
    });

    // Previous button click event
    $('#prev').on('click', function () {
        showSlider('prev');
    });

    // Function to handle slider navigation
    const showSlider = (type) => {
        $('#next, #prev').css('pointer-events', 'none'); // Disable pointer events

        $carousel.removeClass('next prev'); // Remove existing classes
        let $items = $('.carousel .list .item'); // Get all items

        if (type === 'next') {
            $listHTML.append($items.first()); // Move the first item to the end
            $carousel.addClass('next');
        } else {
            $listHTML.prepend($items.last()); // Move the last item to the beginning
            $carousel.addClass('prev');
        }

        // Re-enable pointer events after a delay
        clearTimeout(unAcceptClick);
        unAcceptClick = setTimeout(() => {
            $('#next, #prev').css('pointer-events', 'auto');
        }, 2000);
    };

    // See more button click events
    $(document).off('click', '.seeMore').on('click', '.seeMore', function () {
        $('.carousel').removeClass('next prev').addClass('showDetail');

        // Hide Top Bar and move header to top
        $('#topBar').slideUp(200);
        $('#header').css('top', '0');
        $('#mobile-header').css('top', '0');
        $('#logo').addClass('shrink');
    });

    // Back button click event
    $(document).off('click', '#back').on('click', '#back', function () {
        $('.carousel').removeClass('showDetail');
        $('#topBar').slideDown(200, function () {
            $('#header').css('top', '50px');
            $('#mobile-header').css('top', '50px');
        });
        $('#logo').removeClass('shrink');
    });

    $(document).off('mousemove', '.magnetic-btn').on('mousemove', '.magnetic-btn', function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let btnWidth = $(this).width();
        let btnHeight = $(this).height();
        let transX = (x - btnWidth / 2) / 100;
        let transY = (y - btnHeight / 2) / 100;
        $(this).css('transform', `translate(${transX}px, ${transY}px)`);

        let mx = e.pageX - $(this).offset().left;
        let my = e.pageY - $(this).offset().top;
        $(this).css('--x', mx + 'px');
        $(this).css('--y', my + 'px');
    });

    $(document).off('mouseout', '.magnetic-btn').on('mouseout', '.magnetic-btn', function () {
        $(this).css('transform', '');
    });

    $('#perfumeCard').on('click', function () {
        $('#perfumeCarouselSection').fadeIn(400); // or use .show()
        $('html, body').animate({
            scrollTop: $('#perfumeCarouselSection').offset().top
        }, 600);
    });

    // Open Register from Sidebar
    $('#openRegisterFromSidebar').on('click', function (e) {
        e.preventDefault();
        $('#loginSidebar, #loginOverlay').removeClass('active');
        $('#registerFullscreen').addClass('show');
    });

    // Close Register
    $('#closeRegisterFullscreen').on('click', function () {
        $('#registerFullscreen').removeClass('show');
    });

    // Open Login Sidebar from Register Screen
    $('#openLoginFromRegister').on('click', function (e) {
        e.preventDefault();
        $('#registerFullscreen').removeClass('show'); // Hide Register
        $('#loginSidebar, #loginOverlay').addClass('active'); // Show Login
    });

    $('.mobile-login-trigger').click(function (e) {
        e.preventDefault();
        $('#loginSidebar').addClass('active');
        $('#loginOverlay').addClass('active');
    });

    $('.register-form').on('submit', function (e) {
        e.preventDefault();

        const data = {
            name: $('#regName').val(),
            email: $('#regEmail').val(),
            password: $('#regPassword').val(),
            password_confirmation: $('#regConfirmPassword').val(),
        };

        $.post('/register', data, function (response) {
            if (response.success) {
                $('.register-form').prepend(`
                    <div class="register-message" style="color: green; margin-bottom: 10px; text-align: center;">
                        Registration successful! Please log in.
                    </div>
                `);
                setTimeout(() => {
                    $('#registerFullscreen').removeClass('show');
                    $('#loginSidebar, #loginOverlay').addClass('active');
                }, 1500); // Give some time for user to see the message
            } else {
                $('.register-form').prepend(`
                    <div class="register-message" style="color: red; margin-bottom: 10px; text-align: center;">
                        Registration failed. Please try again.
                    </div>
                `);
            }
        }).fail(function (xhr) {
            $('.register-form .register-message').remove(); // Remove previous messages
            $('.register-form').prepend(`
                <div class="register-message" style="color: red; margin-bottom: 10px; text-align: center;">
                    Error: ${xhr.responseJSON?.message || "Something went wrong."}
                </div>
            `);
            setTimeout(() => {
                $('.register-form .register-message').fadeOut(400, function () {
                    $(this).remove();
                });
            }, 3000); // hide after 3 seconds
        });
    });

    $('.login-form').on('submit', function (e) {
        e.preventDefault();

        const data = {
            email: $('.login-form input[type="email"]').val(),
            password: $('#loginPassword').val()
        };

        // Show loader
        $('#loginBtn .btn-text').hide();
        $('#loginBtn').css('background', 'transparent');
        $('#loginBtn .loader').show();

        // Remove any previous messages
        $('.login-form .login-message').remove();

        $.post('/login', data, function (response) {
            if (response.success) {
                location.reload();
            } else {
                $('.login-form').prepend(`
                <div class="login-message" style="color: red; margin-bottom: 10px; text-align: center;">
                    Invalid credentials.
                </div>
            `);
                setTimeout(() => {
                    $('.login-form .login-message').fadeOut(400, function () {
                        $(this).remove();
                    });
                }, 3000);
            }
        }).fail(function (xhr) {
            $('.login-form').prepend(`
            <div class="login-message" style="color: red; margin-bottom: 10px; text-align: center;">
                Login error. Please try again.
            </div>
        `);
            setTimeout(() => {
                $('.login-form .login-message').fadeOut(400, function () {
                    $(this).remove();
                });
            }, 3000);
        }).always(function () {
            // Restore button
            $('#loginBtn .loader').hide();
            $('#loginBtn').css('background', '#c27d72');
            $('#loginBtn .btn-text').show();
        });
    });

    // Open and close account sidebar for desktop and mobile
    $('.account-trigger-desktop, .account-trigger-mobile').on('click', function (e) {
        e.preventDefault();
        $('#accountSidebar').addClass('active');
    });
    $('#closeAccountSidebar').on('click', function () {
        $('#accountSidebar').removeClass('active');
    });

    // Show Forgot Password Form
    $('#forgotPasswordLink').on('click', function (e) {
        e.preventDefault();
        $('.login-form').hide();
        $('.forgot-password-form').show();
    });

    // Back to Login
    $('#backToLogin').on('click', function (e) {
        e.preventDefault();
        $('.forgot-password-form').hide();
        $('.login-form').show();
    });

    $('#forgotPasswordForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#resetEmail').val();

        // Show loader, hide text, make button background transparent
        $('#resetBtn .btn-text').hide();
        $('#resetBtn').css('background', 'transparent');
        $('#resetBtn .loader').show();

        $.ajax({
            url: $('meta[name="reset-url"]').attr('content'),
            method: 'POST',
            data: { email: email },
            success: function (res) {
                $('#forgotPasswordForm').hide();
                $('#reset-success-msg').text(res.message);
                $('.reset-success').fadeIn(300);
            },
            error: function (xhr) {
                $('.forgot-password-form').prepend(`
                    <div class="reset-error" style="color:red; margin-bottom:10px; text-align:center;">
                        ${xhr.responseJSON?.message || "Something went wrong. Please try again."}
                    </div>
                `);
                setTimeout(() => {
                    $('.reset-error').fadeOut(400, function () {
                        $(this).remove();
                    });
                }, 3000);
            },
            complete: function () {
                /// Restore button
                $('#resetBtn .loader').hide();
                $('#resetBtn').css('background', '#c27d72');
                $('#resetBtn .btn-text').show();
            }
        });
    });

    const logoutUrl = $('meta[name="logout-url"]').attr('content');

    // Handle logout form submission via jQuery
    $('form[action="' + logoutUrl + '"]').on('submit', function () {
        $('#accountSidebar').removeClass('active');
    });

    if (typeof resetToken !== 'undefined' && resetToken.length > 20) {
        $('#loginSidebar').addClass('active');
        $('#loginOverlay').css('width', '100%');
        $('.login-form, .forgot-password-form').hide();
        $('.new-password-form').show();
        $('#resetTokenInput').val(resetToken);
        if (emailFromServer) {
            $('input[name="email"]').val(emailFromServer);
        }
        // Clean URL
        window.history.replaceState({}, document.title, "/");
    }

    // For fallback to see the success msg
    const $newsletterMsg = $('#newsletter-success');
    const $contactMsg = $('#contact-success');

    if ($newsletterMsg.length) {
        // Show footer section if hidden (if needed)
        // Scroll to newsletter success
        $('html, body').animate({
            scrollTop: $newsletterMsg.offset().top - 50
        }, 600);
        setTimeout(function () {
            $newsletterMsg.fadeOut();
        }, 5000);
    }

    if ($contactMsg.length) {
        // Make sure contact section is shown
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection, #search-section, #shop-section, #wishlist-section, #cart-section, #checkout-section, #blog-section, #single-post-section').hide();
        $('#contact-section').show();

        setTimeout(function () {
            $contactMsg.fadeOut();
        }, 5000);
    }

    // Search Section
    $('#productSearchInput').on('input', function () {
        const query = $(this).val().trim();
        const lowerQuery = query.toLowerCase();

        if (query.length < 2) {
            $('#searchResults').html('<p>Type at least 2 characters...</p>');
            return;
        }

        // COMING SOON Keyword Match
        const comingSoonKeywords = {
            'Ladies Handbags': ['handbag', 'hand bag', 'ladies bag', 'bag'],
            'Ladies Shoes': ['shoe', 'shoes', 'heels', 'footwear'],
            'Ladies Clothes': ['cloth', 'clothes', 'dress', 'apparel']
        };

        let matchedComingSoon = null;

        Object.entries(comingSoonKeywords).forEach(([label, keywords]) => {
            keywords.forEach(keyword => {
                if (lowerQuery.includes(keyword.toLowerCase())) {
                    matchedComingSoon = label;
                }
            });
        });

        if (matchedComingSoon) {
            $('#searchResults').html(`
            <div class="coming-soon-message">
                <p>🛍️ <strong>${matchedComingSoon}</strong> is <strong>Coming Soon</strong> at Emalli Roosa!</p>
            </div>
            `);
            return;
        }

        // PERFUME fallback if query is generic
        const perfumeKeywords = ['perfume', 'perfumes', 'scent', 'fragrance', 'oud'];
        const isPerfumeSearch = perfumeKeywords.some(keyword => lowerQuery.includes(keyword));

        $.get('/search-products', { q: query }, function (data) {
            if (isPerfumeSearch && data.length === 0) {
                // fallback: show all perfumes
                $.get('/search-products', { q: 'PERFUMES' }, function (perfumeData) {
                    if (perfumeData.length > 0) {
                        let html = '<div class="product-grid-title">Showing All Perfumes</div>';
                        perfumeData.forEach(p => {
                            html += `
                            <div class="product-card search-result" 
                                    data-key="${p.slug}"
                                    data-name="${p.name}">
                                    <img src="/${p.image}" alt="${p.name}">
                                    <h4>${p.name}</h4>
                            </div>
                            `;
                        });
                        $('#searchResults').html(html);
                    } else {
                        $('#searchResults').html('<p>No perfumes found.</p>');
                    }
                });
                return;
            }

            // Regular result handling
            if (data.length === 0) {
                $('#searchResults').html('<p>No products found.</p>');
            } else {
                let html = '';
                data.forEach(p => {
                    html += `
                    <div class="product-card search-result" 
                            data-key="${p.slug}"
                            data-name="${p.name}">
                        <img src="/${p.image}" alt="${p.name}">
                        <h4>${p.name}</h4>
                    </div>
                    `;
                });
                $('#searchResults').html(html);
            }
        });

    });

    $('.open-search').on('click', function () {
        showSection('search-section');
    });

    $('#closeSearchBtn').on('click', function () {
        $('#search-section').hide();
        $('#slider-section, #category-section').show();
    });

    $('#mobileSearchIcon').on('click', function () {
        $('#mobileSidebar').removeClass('active');
        $('#sidebarOverlay').fadeOut(300);
        showSection('search-section');
    });

    $(document).off('click', '#mobileSearchIcon').on('click', '#mobileSearchIcon', function () {
        const query = $('#mobileSearchInput').val().trim().toLowerCase();

        // Hide sidebar and overlay first
        $('#mobileSidebar').removeClass('active');
        $('#sidebarOverlay').fadeOut(300);

        if (query.length < 2) {
            showSection('search-section');
            $('#searchResults').html('<p>Type at least 2 characters...</p>');
            return;
        }

        // Show search result overlay
        showSection('search-section');

        $.get('/search-products', { q: query }, function (data) {
            if (data.length === 0) {
                $('#searchResults').html('<p>No products found.</p>');
                return;
            }

            let html = '<div class="product-grid-title">Search Results</div>';
            data.forEach(p => {
                html += `
                <div class="product-card search-result"
                     data-key="${p.slug}" 
                     data-name="${p.name}">
                    <img src="/${p.image}" alt="${p.name}">
                    <h4>${p.name}</h4>
                </div>
            `;
            });

            $('#searchResults').html(html);
        });
    });

    //You want users to be able to press Enter instead of clicking the button
    $('#mobileSearchInput').on('keypress', function (e) {
        if (e.which === 13) {
            $('#triggerMobileSearchBtn').click(); // triggers search button click
        }
    });

    // After rendering search results
    $(document).off('click', '.search-result').on('click', '.search-result', function () {
        const selectedKey = $(this).data('key');
        const $matched = $('.carousel .list .item[data-key="' + selectedKey + '"]');

        if ($matched.length > 0) {
            $('#perfumeCarouselSection').show();

            // This is for hide top bar on visit the perfumeCarouselSection by search result
            $('#topBar').slideUp(200);
            $('#header').css('top', '0');
            $('#mobile-header').css('top', '0');
            $('#logo').addClass('shrink');

            $('html, body').animate({
                scrollTop: $('#perfumeCarouselSection').offset().top - 100
            }, 600);


            const $list = $('.carousel .list');
            const $items = $list.children('.item').not($matched);

            // Rebuild list: put item1, matched as 2nd, then rest
            const reordered = [];

            reordered.push($items.eq(0));     // First item (blurred back)
            reordered.push($matched);         // Our selected item = center
            $items.each((i, el) => {
                if (i !== 0) reordered.push(el); // Skip first already added
            });

            $list.html('').append(reordered);

            // Optional highlight
            $('.carousel .list .item').removeClass('active');
            $matched.addClass('active');
        }
    });

    // Shop filter panel 
    $('#toggleFiltersBtn').on('click', function () {
        $('#shopFilters').toggleClass('active');
    });

    $(function () {
        $("#priceRange").ionRangeSlider({
            type: "double",
            min: 0,
            max: 150,
            from: 0,
            to: 150,
            grid: false,
            prefix: "$",
            skin: "round",
            onChange: function (data) {
                $("#minPriceVal").text(`$${data.from}`);
                $("#maxPriceVal").text(`$${data.to}`);

                $(".shop-card").each(function () {
                    const price = parseFloat($(this).data("price"));
                    if (price >= data.from && price <= data.to) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }
        });

        const slider = $("#priceRange").data("ionRangeSlider");
        const initialFrom = slider.result.from;
        const initialTo = slider.result.to;

        $(".shop-card").each(function () {
            const price = parseFloat($(this).data("price"));
            if (price >= initialFrom && price <= initialTo) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Clear filters
    $('#clearFiltersBtn').on('click', function () {
        // Reset categories
        $('.category-filter').prop('checked', true);

        // Reset price range
        const slider = $('#priceRange').data('ionRangeSlider');
        slider.reset();

        $('#minPriceVal').text('$0');
        $('#maxPriceVal').text('$150');

        applyFilters();
    });

    $(document).off('click', '.shop-card').on('click', '.shop-card', function () {
        const selectedKey = $(this).data('key');
        const $matched = $('.carousel .list .item[data-key="' + selectedKey + '"]');

        if ($matched.length > 0) {
            $('#shop-section').hide();
            $('#perfumeCarouselSection').show();

            // Temporarily unbind scroll event
            $(window).off('scroll');

            $('#topBar').slideUp(200);
            $('#header').css('top', '0');
            $('#mobile-header').css('top', '0');
            $('#logo').addClass('shrink');

            $('html, body').animate({
                scrollTop: $('#perfumeCarouselSection').offset().top - 100
            }, 600, function () {
                // Rebind scroll event after animation
                $(window).on('scroll', function () {
                    const scrollTop = $(this).scrollTop();
                    if (scrollTop > 0) {
                        $('#topBar').slideUp(200);
                        $('#header').css('top', '0');
                        $('#mobile-header').css('top', '0');
                    } else {
                        $('#topBar').slideDown(200, function () {
                            $('#header').css('top', '50px');
                            $('#mobile-header').css('top', '50px');
                        });
                    }
                    if (scrollTop > 40) {
                        $('#logo').addClass('shrink');
                    } else {
                        $('#logo').removeClass('shrink');
                    }
                });
            });

            const $list = $('.carousel .list');
            const $items = $list.children('.item').not($matched);
            const reordered = [];
            reordered.push($items.eq(0));
            reordered.push($matched);
            $items.each((i, el) => {
                if (i !== 0) reordered.push(el);
            });
            $list.html('').append(reordered);
            $('.carousel .list .item').removeClass('active');
            $matched.addClass('active');
            $('.carousel').removeClass('next prev').addClass('showDetail');
        }
    });

    $(document).off('click', '.wishlist-icon').on('click', '.wishlist-icon', function (e) {
        e.stopPropagation(); // Stop parent click

        if (window.isLoggedIn !== "true") {
            e.preventDefault();
            const $msgContainer = $(this).closest('.shop-card, .detail').find('.action-message');
            $msgContainer.html('<p class="login-warning">Please login to add to wishlist.</p>');
            return;
        }

        const $icon = $(this);
        const $card = $icon.closest('.shop-card, .item');
        const productId = $card.length
            ? $card.data('id')
            : $icon.parent('[data-id]').data('id');

        // Determine if adding or removing
        const isAdding = !$icon.hasClass('fas');

        if (!isAdding) {
            showSection('wishlist-section');
            return;
        }

        // Toggle icon visually
        $icon.removeClass('far').addClass('fas');

        // Ajax to backend to store
        $.ajax({
            url: '/wishlist',
            type: 'POST',
            data: {
                product_id: productId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                console.log('Wishlist updated', response);

                // Update all icons
                $('.wishlist-icon').each(function () {
                    let iconProductId = null;
                    const card = $(this).closest('.shop-card, .item');
                    if (card.length) {
                        iconProductId = card.data('id');
                    } else {
                        iconProductId = $(this).parent('[data-id]').data('id');
                    }
                    if (parseInt(iconProductId) === parseInt(productId)) {
                        $(this).removeClass('far').addClass('fas');
                    }
                });

                // If wishlist section is visible, reload it
                $('#wishlist-items').load('/wishlist #wishlist-items > *');
            },
            error: function () {
                alert('Error adding to wishlist.');
            }
        });
    });

    // Handle remove wishlist
    $(document).off('click', '.remove-wishlist-btn').on('click', '.remove-wishlist-btn', function (e) {
        e.preventDefault();
        const $btn = $(this);
        const productId = $btn.data('id');

        if (!productId) {
            alert('Error: Product ID not found.');
            return;
        }

        $.ajax({
            url: `/wishlist/${productId}`,
            type: 'POST',
            data: {
                _method: 'DELETE',
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                console.log('Wishlist item removed');

                // Remove the card smoothly
                $btn.closest('.wishlist-card').fadeOut(300, function () {
                    $(this).remove();

                    // If no items left, show message
                    if ($('.wishlist-card').length === 0) {
                        $('#wishlist-items').html(`
                            <div class="empty-wishlist">
                                <img src="/images/empty-cart-illustration.png" alt="Empty Wishlist Illustration" class="empty-wishlist-img">
                                <h3>Your Wishlist is Currently Empty</h3>
                                <p>It looks like you haven’t saved any favorites yet. Browse our products and add items to your wishlist to keep track of things you love!</p>
                                <button onclick="showSection('shop-section')" class="browse-btn">Start Shopping</button>
                            </div>
                        `);
                    }
                });

                // Update all wishlist icons globally to "far"
                $('.wishlist-icon').each(function () {
                    let iconProductId = null;
                    const $card = $(this).closest('.shop-card, .item');
                    if ($card.length) {
                        iconProductId = $card.data('id');
                    } else {
                        iconProductId = $(this).parent('[data-id]').data('id');
                    }

                    if (parseInt(iconProductId) === parseInt(productId)) {
                        $(this).removeClass('fas').addClass('far');
                    }
                });
            },
            error: function () {
                alert('Error removing item.');
            }
        });
    });

    // Add to Cart click handler
    $(document).off('click', '.add-to-cart-btn').on('click', '.add-to-cart-btn', function (e) {
        e.preventDefault();

        const $btn = $(this);
        const $card = $btn.closest('[data-id]');
        const productId = $card.data('id');

        if (!productId) {
            alert('Product ID not found.');
            return;
        }

        $btn.prop('disabled', true).text('Adding...');

        $.ajax({
            url: '/cart',
            method: 'POST',
            data: {
                product_id: productId,
                quantity: 1,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                console.log('Item added to cart', response);

                // Update the count bubble
                if (response.cartCount !== undefined) {
                    updateCartCount(response.cartCount);
                }

                // Instead of fetching immediately, wait a moment
                setTimeout(function () {
                    $.get('/cart/fetch', function (html) {
                        $('.cart-container').html(html);
                    });
                }, 300);

                // Restore button
                $btn.prop('disabled', false).text('Add to Cart');

                // show success message
                $btn.closest('.wishlist-card, .detail').find('.action-message').html(
                    `<p class="success-msg">Added to cart!</p>`
                );
                setTimeout(() => {
                    $('.success-msg').fadeOut(400, function () { $(this).remove(); });
                }, 2000);
            },
            error: function () {
                alert('Error adding to cart.');
                $btn.prop('disabled', false).text('Add to Cart');
            }
        });
    });

    // Hide count bubbles if zero when page loads
    $('.cart-count').each(function () {
        const initialCount = parseInt($(this).text(), 10);
        if (initialCount === 0) {
            $(this).hide();
        }
    });

    $(document).on('change', '.item-quantity input', function () {
        const $input = $(this);
        const newQuantity = parseInt($input.val(), 10);
        const $row = $input.closest('.cart-item');
        const productId = $row.data('id');

        if (newQuantity < 1) {
            alert('Quantity must be at least 1.');
            $input.val(1);
            return;
        }

        $.ajax({
            url: '/cart/update', // Create this route
            method: 'POST',
            data: {
                product_id: productId,
                quantity: newQuantity,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                // Update subtotal for this row
                $row.find('.item-subtotal').text(`$${parseFloat(response.rowSubtotal).toFixed(2)}`);

                // Update cart totals
                $('.cart-subtotal').text(`$${parseFloat(response.cartSubtotal).toFixed(2)}`);
                $('.cart-total').text(`$${parseFloat(response.cartTotal).toFixed(2)}`);
            },
            error: function () {
                alert('Could not update quantity.');
            }
        });
    });

    $(document).on('click', '.remove-item', function (e) {
        e.preventDefault();

        const $item = $(this).closest('.cart-item');
        const productId = $item.data('id');

        if (!productId) {
            alert('Product ID missing.');
            return;
        }

        $.ajax({
            url: '/cart/' + productId,
            type: 'DELETE',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                console.log('Removed:', response);

                // Optionally fade out
                $item.fadeOut(300, function () {
                    // Remove element
                    $(this).remove();

                    // After removal, refresh cart container
                    $.get('/cart/fetch', function (html) {
                        $('.cart-container').html(html);
                    });

                    // Update cart counts
                    if (response.count !== undefined) {
                        updateCartCount(response.count);
                    }
                });
            },
            error: function () {
                alert('Could not remove item.');
            }
        });
    });

    // Quick Buy click
    $(document).on('click', '.quick-buy-btn', function (e) {
        // Check if NOT logged in
        if (window.isLoggedIn !== "true") {
            e.preventDefault();
            const $msgContainer = $(this).closest('.detail, .shop-card').find('.action-message');
            $msgContainer.html('<p class="login-warning">Please login to proceed to quick buy.</p>');
            // Hide after 5 seconds
            setTimeout(() => {
                $msgContainer.empty();
            }, 5000);
            return;
        }

        e.preventDefault();

        window.quickBuyMode = true; // mark Quick Buy active

        // Get quantity safely (if you have an input in carousel), else default to 1
        const quantity = parseInt($(this).closest('.carousel-product').find('.quick-buy-quantity').val()) || 1;

        const productId = $(this).data('product-id');
        const productName = $(this).data('product-name');
        const productPrice = $(this).data('product-price');
        const productImage = $(this).data('product-image');

        // Always set shipping to fixed $5
        const shipping = 5.00;

        // Calculate subtotal and total
        const subtotal = (parseFloat(productPrice) * quantity).toFixed(2);
        const grandTotal = (parseFloat(subtotal) + shipping).toFixed(2);

        // Update order summary HTML
        $('.order-summary .order-items').html(`
            <div class="order-item" style="display:flex; align-items:center; gap:10px;">
                <img src="${productImage}" alt="${productName}" style="width:50px;">
                <div style="flex:1;">
                    <strong>${productName}</strong><br>
                    <label>
                        Quantity:
                        <input 
                            type="number" 
                            class="quick-buy-quantity-input" 
                            value="${quantity}" 
                            min="1" 
                            style="border:none; background:transparent; width:50px;"
                            data-unit-price="${productPrice}">
                    </label><br>
                    <span>Price: $${parseFloat(productPrice).toFixed(2)}</span>
                </div>
            </div>
            <div class="order-item subtotal-quick-buy">
                <span>Subtotal</span>
                <span class="subtotal-amount">$${subtotal}</span>
            </div>
            <div class="order-item">
                <span>Shipping</span>
                <span class="shipping-amount">$${shipping.toFixed(2)}</span>
            </div>
        `);

        // Immediately set the correct total
        $('.quick-buy-grand-total').text(`$${grandTotal}`);

        // Update shipping attribute in case you use it in other calculations
        $('.order-summary').attr('data-shipping', shipping);

        // Inject or update hidden input for quantity
        if ($('input[name="quick_buy_quantity"]').length === 0) {
            $('form').append('<input type="hidden" name="quick_buy_quantity" value="' + quantity + '">');
        } else {
            $('input[name="quick_buy_quantity"]').val(quantity);
        }

        // Show checkout section
        $('.section').hide();
        $('#checkout-section').show();

        $('html, body').animate({
            scrollTop: $("#checkout-section").offset().top
        }, 500);
    });

    // Handle quantity change
    $(document).on('blur', '.quick-buy-quantity-input', function () {
        const newQty = parseInt($(this).val()) || 1;
        const unitPrice = parseFloat($(this).data('unit-price'));
        const newSubtotal = (unitPrice * newQty).toFixed(2);
        const shipping = parseFloat($('.order-summary').attr('data-shipping')) || 0;
        const newGrandTotal = (parseFloat(newSubtotal) + shipping).toFixed(2);

        console.log("Quantity:", newQty);
        console.log("Unit Price:", unitPrice);
        console.log("New Subtotal:", newSubtotal);
        console.log("New Grand Total:", newGrandTotal);

        // Update Subtotal
        $('.subtotal-quick-buy .subtotal-amount').text(`$${newSubtotal}`);

        // Update the Total in the order summary footer
        $('.quick-buy-grand-total').text(`$${newGrandTotal}`);

        $('input[name="quick_buy_quantity"]').val(newQty);
    });

    // Attach Enter key helper
    $('.quick-buy-quantity-input').on('keyup', function (e) {
        if (e.key === 'Enter') {
            $(this).blur(); // triggers blur handler above
        }
    });

    // Show Wishlist Section
    $(document).on('click', '.open-wishlist', function () {
        showSection('wishlist-section');

        $('#topBar').slideUp(200);
        $('#header').css('top', '0');
        $('#mobile-header').css('top', '0');
        $('#logo').addClass('shrink');
    });

    // Example Close Wishlist (if you want to add a close button later)
    $(document).on('click', '#closeWishlistBtn', function () {
        showSection('home-combined');
        $('#topBar').slideDown(200);
        $('#header').css('top', '50px');
        $('#mobile-header').css('top', '50px');
        $('#logo').removeClass('shrink');
    });

    // Sort products
    $('#sortProducts').on('change', function () {
        const sortBy = $(this).val();
        const $cards = $('.shop-products .shop-card');

        const sorted = $cards.get().sort(function (a, b) {
            const priceA = parseFloat($(a).data('price'));
            const priceB = parseFloat($(b).data('price'));
            if (sortBy === 'low-high') {
                return priceA - priceB;
            } else if (sortBy === 'high-low') {
                return priceB - priceA;
            } else {
                return 0;
            }
        });

        $('.shop-products').html(sorted);
    });

    // Category change
    $('.category-filter').on('change', applyFilters);

    // Price slider (assuming you’re using ionRangeSlider)
    $('#priceRange').on('change', function (e) {
        const data = $(this).data('ionRangeSlider');
        $('#minPriceVal').text(`$${data.from}`);
        $('#maxPriceVal').text(`$${data.to}`);
        applyFilters();
    });

    // When cart icon is clicked
    $('.icon-with-label .fa-shopping-cart, .icon-with-label .cart-label, .mobile-header .cart-icon').on('click', function (e) {
        e.preventDefault();

        // Show the section
        showSection('cart-section');

        // Fetch updated cart HTML
        $.get('/cart/fetch', function (html) {
            $('.cart-container').html(html);
        });
    });

    // When mobile bottom tab cart is clicked
    $('.mobile-bottom-tab a').on('click', function (e) {
        if ($(this).find('.fa-shopping-cart').length) {
            e.preventDefault();
            showSection('cart-section');
            $.get('/cart/fetch', function (html) {
                $('.cart-container').html(html);
            });
        }
    });

    $(document).on('click', '.return-shop-btn', function () {
        showSection('shop-section');
    });

    $(document).on('click', '.checkout-btn', function (e) {
        e.preventDefault();
        // Make sure Quick Buy is OFF
        window.quickBuyMode = false;
        showSection('checkout-section');
        $.get('/cart/fetch-checkout', function (html) {
            $('#checkout-section .checkout-container').html(html);
        });
    });

    // To Toggle the Payment Info on Checkout Section
    $(document).on('change', 'input[name="payment_method"]', function () {
        $('.payment-info').slideUp();
        $(this).closest('label').next('.payment-info').slideDown();
    });

    // Show Blog section
    $(document).on('click', '.blog-icon', function (e) {
        e.preventDefault();
        showSection('blog-section');

        $.get('/blog', function (posts) {
            let html = '';
            posts.forEach(post => {
                html += `
                <div class="blog-card" data-id="${post.id}">
                    <img src="${post.image}" alt="${post.title}">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <button class="read-more-btn">Read More</button>
                </div>
            `;
            });
            $('.blog-list').html(html);
        });
    });

    // Show Single Post
    $(document).on('click', '.read-more-btn', function (e) {
        e.preventDefault();
        const postId = $(this).data('post-id');

        // Fetch post data via AJAX
        $.get(`/blog/${postId}`, function (response) {
            // Update single post section content
            $('.single-post-title').text(response.title);
            $('.single-post-image').attr('src', response.cover_image);
            $('.single-post-image').attr('alt', response.title);
            $('.single-post-content').html(response.content);

            // Hide other sections
            $(allSections.join(',')).hide();

            // Show single post section
            $('#single-post-section').fadeIn(300, function () {
                $('html, body').animate({
                    scrollTop: $('#single-post-section').offset().top - 60
                }, 400);
            });
        }).fail(function () {
            alert('Sorry, something went wrong loading the post.');
        });
    });

    // Back button
    $(document).on('click', '.back-to-blog-btn', function () {
        $('#single-post-section').hide();
        $('#blog-section').show();

        // Optionally scroll back to blog
        $('html, body').animate({
            scrollTop: $('#blog-section').offset().top
        }, 500);
    });
});

function adjustSliderHeight() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (scrollTop > 0) {
        $('#slider-section').css('height', windowHeight + 'px');
    } else {
        $('#slider-section').css('height', `calc(100vh - 125px)`);
    }
}

function scrollToSection(targetId, offset = 60) {
    const $target = $('#' + targetId);
    if ($target.length) {
        const targetOffset = $target.offset().top - offset;
        $('html, body').animate({ scrollTop: targetOffset }, 400);
    }
}

function applyFilters() {
    const activeCategories = $('.category-filter:checked').map(function () {
        return $(this).val();
    }).get();

    const minPrice = parseFloat($('#minPriceVal').text().replace('$', ''));
    const maxPrice = parseFloat($('#maxPriceVal').text().replace('$', ''));

    $('.shop-products .shop-card').each(function () {
        const $card = $(this);
        const category = $card.data('category');
        const price = parseFloat($card.data('price'));

        const categoryMatch = activeCategories.includes(category);
        const priceMatch = price >= minPrice && price <= maxPrice;

        if (categoryMatch && priceMatch) {
            $card.show();
        } else {
            $card.hide();
        }
    });
}

// Sets the cart count to a specific value
function updateCartCount(count) {
    if (count > 0) {
        $('.cart-count').text(count).show();
    } else {
        $('.cart-count').hide();
    }
}
