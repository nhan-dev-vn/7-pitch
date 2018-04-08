(function () {
    angular
        .module('pitch7App')
        .controller('rentPitch', controller);
    function controller(ModalService, pitchApiService, rentInfo, close, toastr) {
        var vm = this;
        vm.closeModal = function() {
            close(null);
        }
        vm.clickButtonOk = function() {
            pitchApiService.rentPitch(rentInfo).then(
                function(data) {
                    toastr.success('Đặt sân thành công');
                    close(null);
                }, function(err) {
                    toastr.error(err.data.message);
                }
            )
        }
    }
})();