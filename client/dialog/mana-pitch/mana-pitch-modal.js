(function () {
    angular
        .module('pitch7App')
        .controller('manaPitch', controller);
    function controller(ModalService, pitchApiService, close, toastr, spinner) {
        var vm = this;
        vm.closeModal = function() {
            close(null);
        }
        
        vm.clickButtonOk = function() {
            console.log(vm.pitch);
            close(null);
        }
    }
})();