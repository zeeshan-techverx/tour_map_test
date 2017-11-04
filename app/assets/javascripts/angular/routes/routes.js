angular_test.config(['$stateProvider','$urlRouterProvider', '$httpProvider' ,function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/index');
    $stateProvider

    .state('index', {
        url: '/index',
        views: {
            '': {
                templateProvider: function ($templateFactory, $localStorage) {
                    return $templateFactory.fromUrl('/assets/angular/templates/base/index.html');
                },
                controller: 'BaseCtrl'
            }
        }
    })
    
    .state('toursList', {
        url: '/tours',
        controller: 'TourCtrl',
        templateUrl: '/assets/angular/templates/base/tour-list.html'
    })

    .state('toursNew', {
        url: '/tours/new',
        controller: 'TourCtrl',
        templateUrl: '/assets/angular/templates/base/tour.html',
    })

    .state('toursEdit', {
        url: '/tours/:name',
        controller: 'TourCtrl',
        templateUrl: '/assets/angular/templates/base/tour.html',
    })

    .state('assignDriver', {
        url: '/tours/drivers',
        controller: 'TourCtrl',
        templateUrl: '/assets/angular/templates/base/tour.html',
    })
}]);

