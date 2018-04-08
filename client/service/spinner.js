angular
    .module('pitch7App')
    .service('spinner', geolocation);
function geolocation () {
    let show = function() {
        $('body').css("pointer-events", "none");
        $('body').css("opacity", "0.7");
        $('body').append("<i class='fa fa-spinner fa-spin' id='spinner' style='position: absolute; z-index: 15; top: 300px; left: 50%; font-size: 40px; color: #fb8c05'></i>");
    }
    let hide = function() {
        $('#spinner').remove();
        $('body').css("pointer-events", "unset");
        $('body').css("opacity", "1");
    }
    return {
        show: show,
        hide: hide
    };
}