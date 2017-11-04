function BaseCtrl($rootScope, $scope, $state, $localStorage, toastr, Constants, Map) {

    "use strict";

    $scope.initialize = function(){
        $scope.markers = $localStorage.markers = $localStorage.markers || []
        Map.init('map');
        $scope.markers.map(function(marker) { Map.addMarker(marker) });
    }
    $scope.initialize();

    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace).then(function(response) { 
            $scope.place = {}
            $scope.place.name = response.name;
            $scope.place.lat = response.geometry.location.lat();
            $scope.place.lng = response.geometry.location.lng();
            Map.addMarker($scope.place);

        },
        function(status) {
            $scope.apiError = true;
            $scope.apiStatus = status;
        });
    }

    $scope.send = function() {
        var exists = $localStorage.markers.filter(function(tm){return tm.name == $scope.place.name})[0]
        if(exists) {
            toastr.error("Waypoint Already Exists!");
        }else{
            $localStorage.markers.push($scope.place)
            toastr.success("Waypoint Saved!");
        }
    }


};

angular_test.controller('BaseCtrl', BaseCtrl);
BaseCtrl.$inject = ['$rootScope'
, '$scope'
, '$state'
, '$localStorage'
, 'toastr'
, 'Constants'
, 'Map'
];

