(function () {
    angular
        .module('pitch7App')
        .controller('rentPitch', controller);
    function controller(ModalService, pitchApiService, rentInfo, close, toastr, spinner) {
        var vm = this;
        vm.closeModal = function() {
            close(null);
        }
        vm.banks = ['BIDV', 'Agribank', 'VietcomBank', 'ACB', 'SHB', 'VPBank'];
        vm.bank = vm.banks[0];
        vm.clickButtonOk = function() {
            rentInfo.username = vm.name;
            rentInfo.phoneNumber = vm.phoneNumber;
            spinner.show();
            pitchApiService.rentPitch(rentInfo).then(
                function(data) {
                    spinner.hide();
                    toastr.success('Đặt sân thành công');
                    close(null);
                }, function(err) {
                    spinner.hide();
                    toastr.error(err.data.message);
                }
            )
        }
    }
})();