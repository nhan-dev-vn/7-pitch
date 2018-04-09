(function () {
    angular
        .module('pitch7App')
        .controller('pitchCtrl', pitchCtrl);
    function pitchCtrl($routeParams, spinner, pitchApiService, toastr, $sce, ModalService) {
        window.scrollTo(0, 0);
        var vm = this;
        vm.ratings = [1,2,3,4,5];
        vm.review = {rating: 1};
        vm.isLogin = function() {
            vm.user = pitchApiService.user;
            if(pitchApiService.user.username)
                return true;
            return false;
        }
        spinner.show();
        pitchApiService.getPitch($routeParams.pitchid).then(
            function (data) {
                spinner.hide();
                vm.pitch = data.data;
                vm.time = vm.pitch.times[0];
            }, function (e) {
                spinner.hide();
                toastr.error('Get info of pitch error');
            }
        );
        vm.getIframeSrc = function (x1, x2) {
            return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + x1 + ',' + x2 + '&key=AIzaSyDp0iMIK8nUHR_1zEhhrlRgBAgvh93vWHg&zoom=15');
        };
        vm.date = new Date();
        document.getElementById("nowDate").valueAsDate = vm.date;
        let money;
        vm.rent = function () {
            let date = document.getElementById("nowDate").value;
            let nowDate = new Date();
            let check = true;
            if (nowDate.getFullYear() > vm.date.getFullYear())
                check = false;
            else if (nowDate.getFullYear() == vm.date.getFullYear()) {
                if (nowDate.getMonth() > vm.date.getMonth())
                    check = false;
                else if (nowDate.getMonth() == vm.date.getMonth()) {
                    if (nowDate.getDate() > vm.date.getDate())
                        check = false;
                } else if (nowDate.getDate() > vm.date.getDate())
                    check = false;
            }
            if (check) {
                spinner.show();
                pitchApiService.getPitch(vm.pitch._id).then(
                    function (data) {
                        spinner.hide();
                        vm.pitch.rents = data.data.rents;
                        let numberOfPitch = vm.pitch.numberPitches;
                        for (let rent of vm.pitch.rents) {
                            if (vm.time.time == rent.time && date == rent.day) {
                                numberOfPitch--;
                            }
                        }
                        if (numberOfPitch <= 0)
                            toastr.error('Hết sân rồi');
                        else {
                            for (let time of vm.pitch.times) {
                                if (time.time == vm.time.time) {
                                    money = time.money;
                                    break;
                                }
                            }
                            let rentInfo = {
                                pitchid: vm.pitch._id,
                                time: vm.time.time,
                                money: money,
                                day: date
                            }
                            $('html').addClass('hidden-scroll');
                            ModalService.showModal({
                                templateUrl: "/dialog/rent-pitch/rent-pitch-modal.html",
                                controller: "rentPitch",
                                controllerAs: "modal",
                                inputs: {
                                    rentInfo: rentInfo
                                }
                            }).then(function (modal) {
                                modal.element.modal();
                                modal.close.then(function (result) {
                                    $('html').removeClass('hidden-scroll');
                                    $('body').removeClass('modal-open');
                                    $('.modal-backdrop').remove();
                                });
                            });
                        }
                    }, function (error) {
                        spinner.hide();
                        toastr.error('Get info pitch erro');
                    }
                );
            } else {
                toastr.error('Ngày ' + JSON.stringify(vm.date).slice(1, 11) + ' qua rồi, hãy chọn ngày khác');
            }
        }
    
        vm.addReview = function() {
            vm.review.username = vm.user.username;
            vm.review.pitchid = vm.pitch._id;
            spinner.show();
            pitchApiService.addReview(vm.review).then(
                function(data) {
                    spinner.hide();
                    vm.review = {
                        rating: 1,
                        reviewText: ''
                    }
                    vm.pitch = data.data;
                }, function(err) {
                    spinner.hide();
                    toastr.error('Chưa thêm được nhận xét');
                }
            );
        }
        // vm.editReview = function(reviewid) {
        //     spinner.show();
        //     pitchApiService.editReview(vm.review)
        // }
        vm.deleteReview = function(reviewid) {
            spinner.show();
            pitchApiService.deleteReview(vm.pitch._id, reviewid).then(
                function(data) {
                    spinner.hide();
                    vm.pitch = data.data;
                }, function(err) {
                    spinner.hide();
                    toastr.error('Chưa xóa được nhận xét')
                }
            );
        }
    }
})();