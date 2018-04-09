(function () {
    angular
        .module('pitch7App')
        .controller('homeCtrl', homeCtrl);
    function homeCtrl($scope, geolocation, pitchApiService, toastr, spinner, ModalService) {
        var vm = this;
        let check = false;
        spinner.show();
        function locationList() {
            pitchApiService.locationList().then(
                function (data) {
                    spinner.hide();
                    vm.pitches = data.data;
                    vm.curPitch = vm.pitches[0];
                    vm.time = vm.curPitch.times[0];
                }, function (e) {
                    spinner.hide();
                    toastr.error('Get list pitches error');
                }
            )
        }
        setTimeout(function () {
            if (!check) {
                check = true;
                console.log('3000');
                locationList();
            }
        }, 3000);
        vm.getData = function (position) {
            if (!check) {
                var lat = position.coords.latitude,
                    lng = position.coords.longitude;
                pitchApiService.locationByCoords(lat, lng).then(
                    function successCallback(data) {
                        spinner.hide();
                        check = true;
                        vm.pitches = data.data;
                        vm.curPitch = vm.pitches[0];
                        vm.time = vm.curPitch.times[0];
                    }, function errorCallback(e) {
                        locationList();
                    }
                );
            }
        };
        vm.showError = function (error) {
            console.log('looi');
            locationList();
        };
        vm.noGeo = function () {
            console.log('geo loi');
            locationList();
        };
        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
        vm.date = new Date();
        document.getElementById("nowDate").valueAsDate = vm.date;
        vm.filter = function () {
            return pitchApiService.filter;
        }
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
                pitchApiService.getPitch(vm.curPitch._id).then(
                    function (data) {
                        spinner.hide();
                        vm.curPitch.rents = data.data.rents;
                        let numberOfPitch = vm.curPitch.numberPitches;
                        for (let rent of vm.curPitch.rents) {
                            if (vm.time.time == rent.time && date == rent.day) {
                                numberOfPitch--;
                            }
                        }
                        if (numberOfPitch <= 0)
                            toastr.error('Hết sân rồi');
                        else {
                            for (let time of vm.curPitch.times) {
                                if (time.time == vm.time.time) {
                                    money = time.money;
                                    break;
                                }
                            }
                            let rentInfo = {
                                pitchid: vm.curPitch._id,
                                time: vm.time.time,
                                money: money,
                                day: date
                            }
                            $('html').addClass('hidden-scroll');
                            ModalService.showModal({
                                templateUrl: "dialog/rent-pitch/rent-pitch-modal.html",
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
    }
})();