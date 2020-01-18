$('.slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  fade: false,
  arrows: true,
  prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071146/left_white.png" atl="responsive"></button>',
  nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071163/right_white.png" atl="responsive"></button>',
});

$('.image-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  fade: false,
  arrows: true,
  prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071145/left_purple.png" atl="responsive"></button>',
  nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="https://assets.nationbuilder.com/volteuropadev2/pages/1/attachments/original/1553071162/right_purple.png" atl="responsive"></button>',
});

if($(window).width() < 768)
{
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

function setupLabel() {
        if ($('.label_check input').length) {
            $('.label_check').each(function(){ 
                $(this).removeClass('c_on');
            });
            $('.label_check input:checked').each(function(){ 
                $(this).parent('label').addClass('c_on');
            });                
        };
        if ($('.label_radio input').length) {
            $('.label_radio').each(function(){ 
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function(){ 
                $(this).parent('label').addClass('r_on');
            });
        };
    };

equalheight = function (container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
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
};
    $(document).ready(function(){
        $('.label_check, .label_radio').click(function(){
            setupLabel();
        });
        setupLabel(); 
      
        equalheight(".content-sliderInner .box-content");
      
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
                }).addTo(n), n.scrollWheelZoom.disable(), n.on("click", () => {
                    n.scrollWheelZoom.enable()
                }), n.on("mouseout", () => {
                    n.scrollWheelZoom.disable()
                }), window.mapMarkers.forEach(function(t) {
                    var e = "<strong>" + t.title + "</strong><br/>",
                        i = t.content ? t.content + "<br/>" : "",
                        s = t.link ? '<a href="' + t.link + '">' + (t.linkLabel || "Read more â€¦") + "</a>" : "";
                    L.marker(t.position, {
                        icon: o
                    }).addTo(n).bindPopup(e + i + s)
                })
            }
    });


$(".navbar-toggle").click(function(){
	$("body").toggleClass("open-nav")
});
$(".navbar-nav li a").click(function(){
	var scroll_id = $(this).parent("li").attr("id");
  var scroll_value  = scroll_id.split("_");
	var offset_valu = $("."+scroll_value[0] + "_scrollSection").offset() .top;
var top_scrollValue =  offset_valu;
if($(window).width() > 767 )
{
	var top_scrollValue =  offset_valu - $(".header").outerHeight();
}
$("html, body").animate({ scrollTop: top_scrollValue + "px" }, 500);
});

$(window).scroll(function(){
  if($(window).scrollTop() > 0)
  {
    $(".header").addClass("open");
  }
  else{
    $(".header").removeClass("open");
  }
});


 $('.language-btn').click(function() {
    $('.detail-btn-language').toggle();
})

 $(document).ready(function(){
  $('.nav-part').click(function(){
      if($('.inner-menu').is(":visible"))
      {
        $('.inner-menu').slideUp();
        $('.nav-part').removeClass("active");
      }
      else
      {
        $('.inner-menu').slideDown();
        $('.nav-part').addClass("active");
      }
  });
});