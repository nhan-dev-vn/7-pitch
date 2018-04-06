(function () {
    angular
        .module('pitch7App')
        .controller('homeCtrl', homeCtrl);
    function homeCtrl($scope, geolocation, pitchApiService, toastr) {
        var vm = this;
        vm.getData = function (position) {
            var lat = position.coords.latitude,
            lng = position.coords.longitude;
            pitchApiService.locationByCoords(lat, lng).then(
                function successCallback(data) {
                    vm.pitches = data.data;
                    vm.curPitch = vm.pitches[0];
                    vm.time = vm.curPitch.times[0];
                    console.log(vm.curPitch);
                }, function errorCallback(e) {
                }
            );
        };
        function locationList() {
            pitchApiService.locationList().then(
                function(data) {
                    vm.pitches = data.data;
                    vm.curPitch = vm.pitches[0];
                    vm.time = vm.curPitch.times[0];
                    console.log(vm.curPitch);   
                }, function(e) {
                    toastr.error('Get list pitches error');
                }
            )
        }
        vm.showError = function (error) {
            locationList();
        };
        vm.noGeo = function () {
            locationList();
        };
        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
        vm.date = new Date();
        document.getElementById("nowDate").valueAsDate = vm.date;
    }
})();