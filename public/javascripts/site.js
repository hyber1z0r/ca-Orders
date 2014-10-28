function goBack() {
    window.history.back()
}
$(document).ready(function(){
    $("#BackButton").click(goBack)
});


$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 210,
        itemMargin: 5
    });
});
