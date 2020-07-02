ngapp.controller('homeController', function () {

});

ngapp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    });
}]);
