var carouselItems = [
    {
        img: "nacnce.png",
        link: "http://www.artscouncil.nebraska.gov/",
        caption: "Nebraska Arts Council | Nebraska Cultural Endowment"
    },
    {
        img: "ginasterns.png",
        link: "http://www.ginasternspastries.com/home.html",
        caption: "Gina Sterns Pastries"
    },
    {
        img: "studiob.png",
        link: "http://www.bltd.com/",
        caption: "Studio B"
    },
    {
        img: "nebraskaspine.png",
        link: "http://www.nebraskaspineandpain.com/",
        caption: "Nebraska Spine + Pain Center"
    },
    {
        img: "gingers.png",
        link: "http://www.gingershangup.com/",
        caption: "Ginger's Hang Up"
    }
];

function buildCarousel(id) {
    var carouselHTML = '<ol class="carousel-indicators">';
    carouselItems.forEach(function(v, i) {
       carouselHTML += '<li data-target="#' + id + '" data-slide-to="' + i + '"></li>';
    });
    carouselHTML += '</ol>';

    carouselHTML += '<div class="carousel-inner">';
    carouselItems.forEach(function(v, i) {
        carouselHTML += '<div class="item">';
        carouselHTML += '<img src="img/' + v.img + '" alt="' + v.caption + '">'
        carouselHTML += '<div class="carousel-caption">';
        carouselHTML += '<p><a href="' + v.link + '">' + v.caption + '</a></p>';
        carouselHTML += '</div></div>';
    });
    carouselHTML += '</div>';

    carouselHTML += '<a class="left carousel-control" href="#' + id + '" data-slide="prev">';
    carouselHTML += '<span class="glyphicon glyphicon-chevron-left"></span>';
    carouselHTML += '</a>';
    carouselHTML += '<a class="right carousel-control" href="#' + id + '" data-slide="next">';
    carouselHTML += '<span class="glyphicon glyphicon-chevron-right"></span>';
    carouselHTML += '</a>';
    carouselHTML += '</div>';

    return carouselHTML;
}

$(document).ready(function() {
    $(".carousel").each(function() {
        $(this).html(buildCarousel(this.id));
        $(this).find(".carousel-indicators").children().first().addClass("active");
        $(this).find(".carousel-inner").children().first().addClass("active");
        $(this).carousel({
           interval: 5000,
           pause: "hover",
           wrap: true,
           keyboard: false
        });
    });
})