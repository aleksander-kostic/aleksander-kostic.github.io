(function ($) {
    'use strict';

    /*--------------------------------------------------------
    / 1. Init Vars
    /---------------------------------------------------------*/
    // var testimonialSlider = $('.testimonialSlider'),
    //     clientSlider = $('.clientSlider'),
    var Grid = $('#Grid'),
        pssBox = $('.pssBox'),
        hasCounter = $('.hasCounter');

    /*--------------------------------------------------------
    / 2. All Slider
    /----------------------------------------------------------*/
    // if (testimonialSlider.length > 0) {
    //     testimonialSlider.owlCarousel({
    //         margin: 0,
    //         loop: true,
    //         nav: true,
    //         dots: true,
    //         items: 1,
    //         navText: ['<i class="icofont-long-arrow-left"></i>', '<i class="icofont-long-arrow-right"></i>']
    //     });
    // }

    // if (clientSlider.length > 0) {
    //     clientSlider.owlCarousel({
    //         margin: 2,
    //         loop: true,
    //         nav: false,
    //         dots: false,
    //         items: 4,
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //                 autoWidth: false
    //             },
    //             768: {
    //                 items: 2
    //             },
    //             1024: {
    //                 items: 3
    //             },
    //             1200: {
    //                 items: 4
    //             }
    //         }
    //     });
    // }

    /*--------------------------------------------------------
    / 3. Mixer
    /---------------------------------------------------------*/
    if (Grid.length > 0) {
        Grid.themeWar();
    }

    $(document).ready(function () {
        if (!$('body').hasClass('innerPage')) {
            $('#tabContainer').easytabs({
                tabs: 'ul#mainTab > li',
                updateHash: false,
                animate: true,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut',
                animationSpeed: 250,
                tabActiveClass: 'active',
                transitionInEasing: 'linear',
                transitionOutEasing: 'linear'
            });
        }
    });
    $('.contact_me').click(function (e) {
        e.preventDefault();
        $('#tabContainer').easytabs('select', '#contact');
    });

    /*--------------------------------------------------------
    / 4. Folio Ajax
    /---------------------------------------------------------*/
    if ($('.loadMoreItem').length > 0) {
        $('.loadMoreItem').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass('working');
            var count = parseInt($this.attr('data-count'), 10);
            if (count < 3) {
                $.ajax({
                    type: 'post',
                    url: 'ajax/folio.php',
                    data: {count: count},
                    success: function (data) {
                        setTimeout(function () {
                            $(Grid).append(data);
                            Grid.themeWar();
                            $this.removeClass('working');
                            $this.attr('data-count', (count + 1));
                            [].slice.call(document.querySelectorAll('.folio_effect > .folio_item')).forEach(function (stackEl) {
                                new HamalFx(stackEl);
                            });
                        }, 1500);
                    }
                });
            } else {
                $(Grid).append('<div class="col-lg-12 alertCols"><div class="alert alert-warning folioAlert" role="alert">Sorry! No more posts available.</div></div>');
                $this.removeClass('working');
                $('.loadMoreRow .loadMoreCol').fadeOut();
                setTimeout(function () {
                    $('.alertCols').remove();
                }, 2500);
            }
        });
    }

    /*--------------------------------------------------------
    / 6. Sidebar Toggle
    /---------------------------------------------------------*/
    $('.sidebarToggler').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('SideBarOpened')) {
            $(".sidebar").mCustomScrollbar("destroy");
        } else {
            $(".sidebar").mCustomScrollbar();
        }
        $('body').toggleClass('SideBarOpened');
    });

    $('.sidebarOverlay, .widget_closer').on('click', function () {
        $('body').removeClass('SideBarOpened');
        $(".sidebar").mCustomScrollbar("destroy");
    });

    /*--------------------------------------------------------
    / 7. Skills
    /---------------------------------------------------------*/
    $(window).on('load', function (e) {
        if (pssBox.length > 0) {
            loadSkills();
        }
    });
    var coun = true;

    function loadSkills() {
        $(".pssBox").each(function () {
            var datacount = $(this).attr("data-count");
            $(".pssbBar", this).animate({'width': datacount + '%'}, 2000);
            if (coun) {
                $(this).find('.pssbCount').each(function () {
                    var $this = $(this);
                    $({Counter: 0}).animate({Counter: datacount}, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) + '.');
                        }
                    });
                });
            }
        });
        coun = false;
    }

    /*--------------------------------------------------------
    / 8. Funfact
    /---------------------------------------------------------*/
    var skl = true;
    hasCounter.appear();
    hasCounter.on('appear', function () {
        if (skl) {
            hasCounter.each(function () {
                var $this = $(this);
                jQuery({Counter: 0}).animate({Counter: $this.attr('data-count')}, {
                    duration: 3000,
                    easing: 'swing',
                    step: function () {
                        var num = Math.ceil(this.Counter).toString();
                        $('.counter', $this).html(num);
                    }
                });
            });
            skl = false;
        }
    });

    /*--------------------------------------------------------
    / 9. Form Submission
    /---------------------------------------------------------*/
    if ($('#contactForm').length > 0) {
        $('#contactForm').on('submit', function (e) {
            e.preventDefault();

            // var $this = $(this);
            // var form_data = $this.serialize();
            // $('button[type="submit"]', $this).html('<span><i class="icon icon-Restart"></i>Processing...</span>');
            //
            // var required = 0;
            // $('.required', $this).each(function () {
            //     if ($(this).val() == '') {
            //         $(this).addClass('reqError');
            //         required += 1;
            //     }
            // });
            // if (required === 0) {
            //     $.ajax({
            //         type: 'POST',
            //         url: 'ajax/mail.php',
            //         data: { form_data },
            //         success: function (data) {
            //             $('input, textarea', $this).val('');
            //             $('button[type="submit"]', $this).html('<span><i class="icon icon-Like"></i>Done!</span>');
            //             setTimeout(function () {
            //                 $('button[type="submit"]', $this).html('<span><i class="icon icon-Mail"></i>Send Message</span>');
            //             }, 1500);
            //         }
            //     });
            // } else {
            //     $('button[type="submit"]', $this).html('<span><i class="icon icon-Dislike"></i>Failed!</span>');
            //     setTimeout(function () {
            //         $('button[type="submit"]', $this).html('<span><i class="icon icon-Mail"></i>Send Message</span>');
            //     }, 1500);
            // }
        });
        $('.required').on('keyup', function () {
            $(this).removeClass('reqError');
        });
    }

    /*--------------------------------------------------------
    / 10. Mobile Menu
    /---------------------------------------------------------*/
    $('.mainMenu ul li.menu-item-has-children > a').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
    });
    $('.menu_btn').on('click', function (e) {
        e.preventDefault();
        $('.mainMenu').slideToggle();
        $(this).toggleClass('active');
    });

    /*--------------------------------------------------------
    / 11. Back To Top
    /---------------------------------------------------------*/
    var back = $("#backtotop"),
        body = $("body, html");
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height()) {
            back.css({bottom: '30px', opacity: '1', visibility: 'visible'});
        } else {
            back.css({bottom: '-30px', opacity: '0', visibility: 'hidden'});
        }
    });
    body.on("click", "#backtotop", function (e) {
        e.preventDefault();
        body.animate({scrollTop: 0}, 800);
        return false;
    });

    /*--------------------------------------------------------
    / 12. Preloader
    /---------------------------------------------------------*/
    $(window).load(function () {
        var preload = $('.preloader');
        if (preload.length > 0) {
            preload.delay(800).fadeOut(500);
        }
    });
})(jQuery);
