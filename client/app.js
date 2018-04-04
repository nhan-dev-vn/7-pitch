let app = angular.module('pitch7', []);
app.controller('myCtrl', function($http, $scope) {
    $scope.login = function() {
        $http({
            method: 'POST',
            url: '/api/login',
            json: true,
            data: {
                username: $scope.username,
                password: $scope.password
            }
        }).then((response) => {
            console.log(response);
            $scope.name = response.data.username;
            $scope.password = response.data.password;
        }, (err) => {
            console.log(err);
        });
    }
});