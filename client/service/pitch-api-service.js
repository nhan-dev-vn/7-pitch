(function () {
    angular
        .module('pitch7App')
        .service('pitchApiService', Controller);
    function Controller($http) {
        let locationByCoords = function(lat, lng) {
            return $http({
                url: '/api/pitch/listByDistance/' + lng + '/' + lat + '/' + 10,
                method: 'GET',
            });
        }
        let locationList = function() {
            return $http({
                url: '/api/pitch/list',
                method: 'GET'
            });
        }
        return {
            locationByCoords: locationByCoords,
            locationList: locationList
        }
    }
})();