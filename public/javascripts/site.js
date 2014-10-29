function goBack() {
    window.history.back()
}
$(document).ready(function(){
    $("#BackButton").click(goBack);
    setTimeout("slideit()",2500);
    $('#slider > img#1').fadeIn(300);
    startSlider();
});

function startSlider(){
    count = $("#slider > img").size();

    loop = setInterval(function(){

        if(sliderNext > count){
            sliderNext = 1;
            sliderInt = 1;
        }
    $("#slider > img").fadeOut(300);
    $("#slider > img#" + sliderNext).fadeIn(300);

        sliderInt = sliderNext;
        sliderNext = sliderNext +1;
    }, 3000)
}

$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 210,
        itemMargin: 5
    });
});

var step=1
function slideit()
{
document.images.slide.src=eval(""+step+".jpg")
if(step<4)
step++
else
step=1
    }

sliderInt = 1;
sliderNext = 2;

function prev(){
    newSlide = sliderInt - 1;
    showSlide(newSlide);
}
function next(){
    newSlide = sliderInt + 1;
    showSlide(newSlide);
}

function stopLoop (){
    window.clearInterval(loop);

}

function showSlide(Id){
    stopLoop();
    if(Id > count){
        Id = 1;
        }else if(Id <1){
        Id = count;
    }

    $("#slider > img").fadeOut(300);
    $("#slider > img#" + Id).fadeIn(300);

    sliderInt = Id;
    sliderNext = Id +1;
}

