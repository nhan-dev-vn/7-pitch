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
            ModalService.showModal({
                templateUrl: "/dialog/login/login-modal.html",
                controller: "login",
                controllerAs: "modal"
            }).then(function (modal) {
                modal.element.modal();
                $('body').css("padding-right", "0px");
                modal.close.then(function (result) {
                    $('body').css("padding-right", "0px");

                    if (result)
                        vm.user = result;
                });
            });
        }
    }
})();