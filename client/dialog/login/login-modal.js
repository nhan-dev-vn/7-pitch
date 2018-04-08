(function () {
    angular
        .module('pitch7App')
        .controller('login', controller);
    function controller(ModalService, pitchApiService, toastr, close) {
        var vm = this;
        vm.login = true;
        vm.closeModal = function () {
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('body').css("padding-right", "0px");
            close(vm, 500);
        }
        vm.clickButtonRegister = function () {
            console.log(vm.user);
            if (vm.user.rePassword != vm.user.password)
                toastr.error('Mật khẩu không trùng');
            else
                pitchApiService.register(vm.user).then(
                    function (data) {
                        if (data.status == 200) {
                            toastr.success(data.data.message);
                        } else {
                            toastr.error(data.data.message);
                        }
                    }, function (err) {
                        toastr.error(err.data.message);
                    }
                );
        }
        vm.clickButtonLogin = function () {
            console.log(vm.user);
            pitchApiService.login(vm.user).then(
                function (data) {
                    if (data.status == 200) {
                        pitchApiService.user = vm.user;
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('body').css("padding-right", "0px");
                        close(vm.user, 500);
                    } else {
                        toastr.error(data.data.message);
                    }
                }, function (err) {
                    toastr.error(err.data.message);
                }
            );
        }
    }
})();