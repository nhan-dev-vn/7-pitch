(function () {
    angular
        .module('pitch7App')
        .service('pitchApiService', Controller);
    function Controller($http) {
        let locationByCoords = function(lat, lng) {
            return $http({
                url: '/api/pitch/listByDistance/' + lng + '/' + lat + '/' + 1000,
                method: 'GET',
            });
        }
        let locationList = function() {
            return $http({
                url: '/api/pitch/list',
                method: 'GET'
            });
        }
        let filter;
        let getPitch = function(pitchid) {
            return $http({
                url: '/api/pitch/' + pitchid,
                method: 'GET'
            });
        }
        let rentPitch = function(rentInfo) {
            return $http({
                url: '/api/pitch/' + rentInfo.pitchid + '/rent',
                method: 'POST',
                json: true,
                data: rentInfo
            });
        }
        let register = function(user) {
            return $http({
                url: '/api/register',
                method: 'POST',
                json: true,
                data: user
            });
        }
        let login = function(user) {
            return $http({
                url: '/api/login',
                method: 'POST',
                json: true,
                data: user
            });
        }
        let addReview = function(review) {
            return $http({
                url: '/api/pitch/' + review.pitchid + '/review',
                method: 'POST',
                json: true,
                data: review
            });
        }
        let editReview = function(review) {
            return $http({
                url: '/api/pitch/' + review.pitchid + '/review/' + review.reivewid,
                method: 'PUT',
                json: true,
                data: review
            });
        }
        let deleteReview = function(pitchid, reivewid) {
            return $http({
                url: '/api/pitch/' + pitchid + '/review/' + reivewid,
                method: 'DELETE'
            });
        }
        return {
            locationByCoords: locationByCoords,
            locationList: locationList,
            getPitch: getPitch,
            filter: filter,
            rentPitch: rentPitch,
            user: {},
            register: register, 
            login: login,
            addReview: addReview,
            editReview: editReview,
            deleteReview: deleteReview
        }
    }
})();