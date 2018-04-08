(function () {
    angular
        .module('pitch7App')
        .controller('pitchCtrl', pitchCtrl);
    function pitchCtrl($routeParams, spinner, pitchApiService, toastr, $sce, ModalService) {
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
        let money;
        vm.rent = function () {
            let date = document.getElementById("nowDate").value;
            let nowDate = new Date();
            let check = true;
            if(nowDate.getFullYear()>vm.date.getFullYear())
                check = false;
            else if(nowDate.getFullYear()==vm.date.getFullYear()) {
                if(nowDate.getMonth()>vm.date.getMonth())
                    check = false;
                else if(nowDate.getMonth()==vm.date.getMonth()) {
                        if(nowDate.getDate()>vm.date.getDate())
                            check = false;
                } else if(nowDate.getDate()>vm.date.getDate())
                            check = false;
            }
            if(check) {
                pitchApiService.getPitch(vm.pitch._id).then(
                    function (data) {
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
                                username: 'nhan',
                                phoneNumber: '01633461337',
                                time: vm.time.time,
                                money: money,
                                day: date
                            }
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
                                });
                            });
                        }
                    }, function (error) {
                        toastr.error('Get info pitch erro');
                    }
                );
            } else {
                toastr.error('Ngày ' + JSON.stringify(vm.date).slice(1,11)+ ' qua rồi, hãy chọn ngày khác');
            }
            
        }
    }
})();