(function () {
    angular
        .module('pitch7App')
        .controller('pitchCtrl', pitchCtrl);
    function pitchCtrl($routeParams, spinner, pitchApiService, toastr, $sce) {
        var vm = this;
        spinner.show();
        pitchApiService.getPitch($routeParams.pitchid).then(
            function(data) {
                spinner.hide();
                vm.pitch = data.data;
                vm.time = vm.pitch.times[0];
            }, function(e) {
                spinner.hide();
                toastr.error('Get info of pitch error');
            }
        );
        vm.getIframeSrc = function (x1,x2){
            return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + x1 + ',' + x2 + '&key=AIzaSyDp0iMIK8nUHR_1zEhhrlRgBAgvh93vWHg&zoom=15')  ;
        };
        vm.date = new Date();
        document.getElementById("nowDate").valueAsDate = vm.date;
    }
})();