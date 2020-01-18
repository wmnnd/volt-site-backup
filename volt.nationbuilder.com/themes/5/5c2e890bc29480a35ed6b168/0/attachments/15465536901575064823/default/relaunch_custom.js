(function () {
    "use strict";

    var viewPortScrollHandler = {
        registeredHandlers:[],
        init: function () {
            var registeredHandlers = this.registeredHandlers;
            window.addEventListener('scroll', _.throttle(function () {
                registeredHandlers.forEach(function (handler) {
                    if (handler.$element.isInViewportOrAbove()) {
                        handler.callback();
                        if (handler.options.onceOnly) {
                            registeredHandlers.splice(registeredHandlers.indexOf(handler), 1 );
                        }
                    }
                })
            }, 500));
        },
        registerCallback: function (selector, callback, options) {
            var handler = {
                $element: $(selector),
                callback: callback,
                options: (options || {})
            };
            if (handler.$element.length > 0) {
                this.registeredHandlers.push(handler);
            }
        }
    };

    viewPortScrollHandler.init();

    initLazyImageLoading();
    initSlickSliders();


    function initSlickSliders() {
        $('.slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            fade: false,
            arrows: true,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071146/left_white.png" atl="responsive"></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071163/right_white.png" atl="responsive"></button>',
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var nextSlider = $(slick.$slides[nextSlide]);
            var nextSlideBanner = nextSlider.find(".banner-image");
            var lazyClass = nextSlideBanner.data("lazy-class");
            if (lazyClass) {
                if (!nextSlideBanner.hasClass(lazyClass)) {
                    nextSlideBanner.css({"opacity": 0});
                    nextSlideBanner.animate({"opacity": 1});
                    nextSlideBanner.addClass(lazyClass);
                }
            }
        });

        $('.image-slider').slick({
            lazyLoad: 'ondemand',
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            fade: false,
            arrows: true,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071145/left_purple.png" atl="responsive"></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071162/right_purple.png" atl="responsive"></button>',
        });

        if ($(window).width() < 768) {
            $('.content-sliderInner').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                fade: false,
                arrows: true,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071146/left_white.png" atl="responsive"></button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071163/right_white.png" atl="responsive"></button>',
            });
        }
    }

    function initLazyImageLoading() {
        $.fn.isInViewportOrAbove = function() {
            var offset = $(this).offset();
            if (!offset) {
                return false;
            }
            var elementTop = offset.top;
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementTop < viewportBottom;
        };

        var lazyImageElements = Array.prototype.map.call($('[data-lazy-show-id]'), function (e) {
            var $e = $(e);
            return {
                $e: $e,
                lazyShowSelector: "#" + $e.data("lazy-show-id"),
                src: $e.data("lazy-src")
            };
        });
        var lazyImagesByShowSelectors = _.groupBy(lazyImageElements, "lazyShowSelector");

        _.keys(lazyImagesByShowSelectors).forEach(function (selector) {
            viewPortScrollHandler.registerCallback(selector, function () {
                var lazyImageElements = lazyImagesByShowSelectors[selector];
                lazyImageElements.forEach(function (lazyImageElement) {
                    lazyImageElement.$e.attr("src", lazyImageElement.src).show();
                })
            }, {onceOnly: true});
        });

    }


    function setupLabel() {
        if ($('.label_check input').length) {
            $('.label_check').each(function () {
                $(this).removeClass('c_on');
            });
            $('.label_check input:checked').each(function () {
                $(this).parent('label').addClass('c_on');
            });
        }
        ;
        if ($('.label_radio input').length) {
            $('.label_radio').each(function () {
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function () {
                $(this).parent('label').addClass('r_on');
            });
        }
        ;
    };

    function equalheight(container) {
        var currentTallest = 0,
            currentRowStart = 0,
            currentDiv = 0,
            rowDivs = new Array(),
            $el,
            topPostion = 0;

        $(container).each(function () {
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }

    $(document).ready(function () {
        $('.label_check, .label_radio').click(function () {
            setupLabel();
        });
        setupLabel();

        equalheight(".content-sliderInner .box-content");

        viewPortScrollHandler.registerCallback("#mehr-ueber-uns", function () {
            $('body').append('<script src=\'https://www.powr.io/powr.js?platform=html\'></script>');
        }, {onceOnly: true});

        viewPortScrollHandler.registerCallback("#all-candidates", function () {
            if (document.getElementById("map-image")) {
                var n = L.map("map-image").setView([47.86543, 12.7979], 4),
                    o = L.icon({
                        iconUrl: "https://d3n8a8pro7vhmx.cloudfront.net/themes/5a66b8b95ee54dd3f8000000/attachments/original/1544006775/s-marker-icon.png?1544006775",
                        iconSize: [15, 25],
                        iconAnchor: [7, 23],
                        popupAnchor: [1, -15]
                    });
                L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png", {
                    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
                    minZoom: 1,
                    maxZoom: 18
                }).addTo(n), n.scrollWheelZoom.disable(), n.on("click", function () {
                    n.scrollWheelZoom.enable()
                }), n.on("mouseout", function () {
                    n.scrollWheelZoom.disable()
                }), window.mapMarkers.forEach(function (t) {
                    var e = "<strong>" + t.title + "</strong><br/>",
                        i = t.content ? t.content + "<br/>" : "",
                        s = t.link ? '<a href="' + t.link + '">' + (t.linkLabel || "Read more Ã¢â‚¬Â¦") + "</a>" : "";
                    L.marker(t.position, {
                        icon: o
                    }).addTo(n).bindPopup(e + i + s)
                })
            }
        }, {onceOnly: true});

    });


    $(".navbar-toggle").click(function () {
        $("body").toggleClass("open-nav")
    });
    $("a[data-scroll-to]").click(function (e) {
        e.preventDefault();
        var scroll_id = $(this).data("scroll-to");
        var scroll_value = scroll_id.split("_");
        var offset_valu = $("." + scroll_value[0] + "_scrollSection").offset().top;
        var top_scrollValue = offset_valu;
        if ($(window).width() > 767) {
            top_scrollValue = offset_valu - $(".header").outerHeight();
        }
        $("html, body").animate({scrollTop: top_scrollValue + "px"}, 500);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".header").addClass("open");
        }
        else {
            $(".header").removeClass("open");
        }
    });


    $('.language-btn').click(function () {
        $('.detail-btn-language').toggle();
    })

    $(document).ready(function () {
        $('.nav-part').click(function () {
            if ($('.inner-menu').is(":visible")) {
                $('.inner-menu').slideUp();
                $('.nav-part').removeClass("active");
            }
            else {
                $('.inner-menu').slideDown();
                $('.nav-part').addClass("active");
            }
        });
    });

    function initCookiesAccept() {
        function accept_cookies() {
            localStorage.setItem('accept_cookies', true);
            document.getElementById("cookies-eu-banner").style.display = "none";
        }

        var cookies = localStorage.getItem('accept_cookies');
        if (cookies == null) {
            var $element = $("<div id='cookies-eu-banner'>");
            $element.html("Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies.<br /> Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.<br /> Weitere Informationen zu Cookies erhalten Sie in unserer Datenschutzerklärung. <button id='cookies-eu-accept' >Verstanden !</button> ")
            $("body").append($element);
            $element.find("#cookies-eu-accept").on('click', accept_cookies);
        }
    }




    $(document).ready(function () {
        // quick fix for https issue
        jQuery(".shop a")
            .attr("href", "http://shop.volteuropa.org")
            .attr("target", "_blank");

        jQuery("a[href='https://volt.team/join']")
            .attr("target", "_blank");

        initCookiesAccept();
    });

}());
