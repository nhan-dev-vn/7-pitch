angular
    .module('pitch7App')
    .service('geolocation', geolocation);
function geolocation () {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
        }
        else {
            cbNoGeo();
        }
    };
    return {
        getPosition : getPosition
    };
}