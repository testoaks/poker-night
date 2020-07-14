ngapp.controller('homeController', function ($scope) {

});

ngapp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    });
}]);
