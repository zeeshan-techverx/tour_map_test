function TourCtrl($rootScope, $scope, $state, $localStorage, toastr, Constants, Map, $stateParams) {

    "use strict";

    $scope.initialize = function(){
        Map.init();
        $scope.markers = $localStorage.markers;
        $scope.list = angular.copy($scope.markers)
        $scope.tours = $localStorage.tours = $localStorage.tours || [];
        if($stateParams.name){
            $scope.tour = $scope.tours.filter(function(tour){ return tour.name == $stateParams.name})[0]; 
            Map.createTour($scope.tour);   
        } else {
            $scope.tour = {tourMarkers: []};
            $scope.tour.tourMarkers = [];
            $scope.markers.map(function(marker) { Map.addMarker(marker) });
        }
        $scope.drivers = Constants.drivers
    }
    $scope.initialize();

    $scope.send = function() {
        $localStorage.markers.push($scope.place)
    }

    $scope.setOriginMarker = function(index){
        $scope.tour.origin = $scope.markers[index]
    }

    $scope.setDestinationMarker = function(index){
        $scope.tour.destination = $scope.markers[index]
    }

    $scope.addToTour = function(marker){
        var exist = $scope.tour.tourMarkers.filter(function(r){ return r.name == marker.name})
        if(exist.length == 0){
            $scope.tour.tourMarkers.push({
                lat: marker.lat,
                lng: marker.lng,
                name: marker.name,
            })
            $scope.resetTourMap()
        }
    }

    $scope.resetTourMap = function(){
        var count = $scope.tour.tourMarkers.length;
        if (count == 0){
            Map.init
        } else if (count > 0) {
            Map.createTour($scope.tour); 
        }
    }

    $scope.removeFromTour = function(index){
        $scope.tour.tourMarkers.splice(index, 1)
        $scope.resetTourMap()
    }

    var findMarker = function(tour, marker){
        return tour.tourMarkers.filter(function(tm){return marker.name == tm.name})[0]
    }

    $scope.createTour = function(tour){
        if(tour.tourMarkers.length > 1){
            Map.createTour(tour);
            $localStorage.tours.push(tour); 
            toastr.success("Tour Saved!");  
            $state.go("toursList", {name: tour.name})
        } else {
            alert("Please add more waypoints.")
        }
    }

    $scope.removeTour = function(index){
        $scope.tours.splice(index, 1)
    }

    $scope.showTour = function(index){
        $state.go("toursEdit", {name: $scope.tours[index].name})
    }


};

angular_test.controller('TourCtrl', TourCtrl);
TourCtrl.$inject = ['$rootScope'
, '$scope'
, '$state'
, '$localStorage'
, 'toastr'
, 'Constants'
, 'Map'
, '$stateParams'
];

