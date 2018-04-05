(function () {
    angular.module('pitch7App', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })

            .when('/pitch/:pitchid', {
                templateUrl: 'pitch/pitch.html',
                controller: 'pitchCtrl',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
    angular
        .module('pitch7App')
        .config(['$routeProvider', '$locationProvider', config]);
})();