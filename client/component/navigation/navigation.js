(function() {
    angular
        .module('pitch7App')
        .component('navigation', {
            templateUrl: 'component/navigation/navigation.html',
            controller: controller,
            controllerAs: 'vm'
        });
    function controller(pitchApiService) {
        let vm = this;
        vm.searchChange = function() {
            pitchApiService.filter = vm.search;
        }
    }
})();