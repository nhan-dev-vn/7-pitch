(function () {
    angular
        .module('pitch7App')
        .component('navigation', {
            templateUrl: 'component/navigation/navigation.html',
            controller: controller,
            controllerAs: 'vm'
        });
    function controller(pitchApiService, ModalService, toastr) {
        let vm = this;
        vm.searchChange = function () {
            pitchApiService.filter = vm.search;
        }
        vm.user = {};
        vm.isLogin = function() {
            if(vm.user.username)
                return true;
            return false;
        }
        vm.login = function () {
            $('html').addClass('hidden-scroll');
            ModalService.showModal({
                templateUrl: "/dialog/login/login-modal.html",
                controller: "login",
                controllerAs: "modal"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    $('html').removeClass('hidden-scroll');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    if (result)
                        vm.user = result;
                });
            });
        }
        vm.logout = function() {
            pitchApiService.user = {};
            vm.user = {};
        }
    }
})();