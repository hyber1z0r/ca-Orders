function goBack() {
    window.history.back()
}
$(document).ready(function () {
    $("#BackButton2").click(goBack)
    $("#BackButton").click(goBack);
    setTimeout("slideit()", 2500);
    $('#slider > img#1').fadeIn(300);
    startSlider();
    addDeleteHandler();
});

function startSlider() {
    count = $("#slider > img").size();

    loop = setInterval(function () {

        if (sliderNext > count) {
            sliderNext = 1;
            sliderInt = 1;
        }
        $("#slider > img").fadeOut(300);
        $("#slider > img#" + sliderNext).fadeIn(300);

        sliderInt = sliderNext;
        sliderNext = sliderNext + 1;
    }, 3000)
}

$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 210,
        itemMargin: 5
    });
});

var step = 1
function slideit() {
    document.images.slide.src = eval("" + step + ".jpg")
    if (step < 4)
        step++
    else
        step = 1
}

sliderInt = 1;
sliderNext = 2;

function prev() {
    newSlide = sliderInt - 1;
    showSlide(newSlide);
}
function next() {
    newSlide = sliderInt + 1;
    showSlide(newSlide);
}

function stopLoop() {
    window.clearInterval(loop);

}

function showSlide(Id) {
    stopLoop();
    if (Id > count) {
        Id = 1;
    } else if (Id < 1) {
        Id = count;
    }

    $("#slider > img").fadeOut(300);
    $("#slider > img#" + Id).fadeIn(300);

    sliderInt = Id;
    sliderNext = Id + 1;
}
var deleteId;
function addDeleteHandler() {
    // All deletes buttons will set the deleteId when pressed, this id matches the id of the row it was pressed.
    $('.deletebutton').click(function () {
        deleteId = $(this).attr('rowid');
    });

    $('#orderdelete').click(function () {
        $.ajax({
            url: './orders/' + deleteId,
            type: 'DELETE'
        }).done(function (data) {
            if (data.status == 'ok') {
                // show toast with success
                toastSuccess();
                setTimeout('location.reload(true)', 2500);
            } else if (data.status == 'not ok') {
                toastNotFound();
            }
        }).fail(function () {
            toastFailure();
        })
    });
    $('#categorydelete').click(function () {
        $.ajax({
            url: './categories/' + deleteId,
            type: 'DELETE'
        }).done(function (data) {
            if (data.status == 'ok') {
                // show toast with success
                toastSuccess();
                setTimeout('location.reload(true)', 2500);
            } else if (data.status == 'not ok') {
                toastNotFound();
            }
        }).fail(function () {
            toastFailure();
        })
    })
}

function toastSuccess() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr.success("Successfully deleted the item", "Success");
}

function toastFailure() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr.error("The item couldn't be deleted, due to some technical error.", "Error");
}

function toastNotFound() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr.warning("Nothing was removed, as the document wasn't found.", "404");
}