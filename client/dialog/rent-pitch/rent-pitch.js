(function () {
    angular
        .module('pitch7App')
        .controller('rentPitch', controller);
    function controller(ModalService, pitchApiService, rentInfo, close) {
        var vm = this;
        console.log(rentInfo);
        vm.close = function() {
            close(vm, 500);
        }
        vm.clickButtonOk = function() {
            pitchApiService.rentPitch(rentInfo).then(
                function(data) {
                    console.log(data);
                    close(vm, 500);
                }, function(err) {
                    console.log(err);
                }
            )
        }
    }
})();