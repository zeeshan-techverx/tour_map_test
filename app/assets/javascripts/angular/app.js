var angular_test = angular
.module('angular_test', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'toastr',
    'angular-confirm',
    'angular-loading-bar',
    'ngMap'
    ]);

angular_test.config(["$httpProvider", function($httpProvider) {
    csrfToken = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrfToken;
    $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrfToken;
    $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrfToken;
}]);

angular_test.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        messageClass: 'toast-message',
        tapToDismiss: true,
        timeOut: 5000,
    });
});