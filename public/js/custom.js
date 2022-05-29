// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});


$(document).ready(function () {
    $(".order_online").on('click', () => {

       $(".order_page").animate({
            right: 0
        },  800)
   $('.opasityy').css('display' ,'block')
    })
    $(".opasityy").on('click', () => {
        $(".order_page").animate({
            right: -1000
        },  800)
        $('.book_section').animate({
            right: -1000
        },  900)
   $('.opasityy').css('display' ,'none')
    })
    $('.ord_X').click(function () {
        $(".order_page").animate({
            right: -1000
        },  800)
    })

    $('.order_shop .nav-link').click(function () {
        $('.book_section').animate({
            right: 560
        },  900)
    })
    $('.form_close').click(function () {
        $('.book_section').animate({
            right: -1000
        },  900)
    })
    
    
});


