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

        if (!targetId) return; // Skip links without data-target

        // Remove active class from all nav-links
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        // Hide all main sections
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection, #contact-section, #search-section, #shop-section').hide();

        if (targetId === 'home-combined') {
            $('#slider-section, #category-section').fadeIn(300);
        } else {
            $('#' + targetId).fadeIn(300);
        }

        let scrollTarget = (targetId === 'home-combined') ? '#slider-section' : '#' + targetId;

        $('html, body').animate({
            scrollTop: $(scrollTarget).offset().top - 60
        }, 400);

        // Show the selected section
        $('#' + targetId).fadeIn(300);

        // Scroll to top of section (adjusted for header height)
        scrollToSection(targetId);

        // Close mobile sidebar if open
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
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection').hide();
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
        $('html, body').animate({ scrollTop: 0 }, 400);
        // Hide all other sections
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection, #contact-section').hide();

        // Show the search section
        $('#search-section').show();
    });

    $('#closeSearchBtn').on('click', function () {
        $('#search-section').hide();
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection, #contact-section').show();
    });

    $('#mobileSearchIcon').on('click', function () {
        $('#mobileSidebar').addClass('active');
        $('#sidebarOverlay').fadeIn(300); // show overlay
    });

    $(document).off('click', '#mobileSearchIcon').on('click', '#mobileSearchIcon', function () {
        const query = $('#mobileSearchInput').val().trim().toLowerCase();

        // Hide sidebar and overlay first
        $('#mobileSidebar').removeClass('active');
        $('#sidebarOverlay').fadeOut(300);

        // Hide all sections like desktop
        $('#slider-section, #about-section, #category-section, #perfumeCarouselSection, #contact-section').hide();

        if (query.length < 2) {
            $('#search-section').show();
            $('#searchResults').html('<p>Type at least 2 characters...</p>');
            $('html, body').animate({ scrollTop: 0 }, 400);
            return;
        }

        // Show search result overlay
        $('#search-section').show();
        $('html, body').animate({ scrollTop: 0 }, 400);

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

    $("#priceRange").ionRangeSlider({
        type: "double",
        min: 0,
        max: 810,
        from: 0,
        to: 810,
        grid: false,
        prefix: "$",
        skin: "round", // nice rounded handles
        onChange: function (data) {
            // Update display values
            $("#minPriceVal").text(data.from_pretty);
            $("#maxPriceVal").text(data.to_pretty);
        }
    });

    // Clear filters
    $('#clearFiltersBtn').on('click', function () {
        $('#filterPerfume').prop('checked', false);

        var sliderInstance = $("#priceRange").data("ionRangeSlider");
        sliderInstance.reset();

        $('#minPriceVal').text(`$${sliderInstance.result.min}`);
        $('#maxPriceVal').text(`$${sliderInstance.result.max}`);
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
        e.stopPropagation(); // <-- prevents parent click event

        if (window.isLoggedIn === "true") {
            // Toggle icon
            const $icon = $(this);
            if ($icon.hasClass('fas')) {
                $icon.removeClass('fas').addClass('far');
            } else {
                $icon.removeClass('far').addClass('fas');
            }
            console.log("Added to wishlist!");
        } else {
            e.preventDefault();
            const $msgContainer = $(this).closest('.shop-card, .detail').find('.action-message');
            $msgContainer.html('<p class="login-warning">Please login to add to wishlist.</p>');
            // Hide after 3 seconds
            setTimeout(() => {
                $msgContainer.empty();
            }, 5000);
        }
    });

    // Add to Cart click
    $(document).on('click', '.add-to-cart-btn', function (e) {
        if (window.isLoggedIn === "true") {
            return;
        }
        e.preventDefault();
        const $msgContainer = $(this).closest('.detail, .shop-card').find('.action-message');
        $msgContainer.html('<p class="login-warning">Please login to add to cart.</p>');
        // Hide after 3 seconds
        setTimeout(() => {
            $msgContainer.empty();
        }, 5000);
    });

    // Quick Buy click
    $(document).on('click', '.quick-buy-btn', function (e) {
        if (window.isLoggedIn === "true") {
            return;
        }
        e.preventDefault();
        const $msgContainer = $(this).closest('.detail, .shop-card').find('.action-message');
        $msgContainer.html('<p class="login-warning">Please login to proceed to quick buy.</p>');
        // Hide after 3 seconds
        setTimeout(() => {
            $msgContainer.empty();
        }, 5000);
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
