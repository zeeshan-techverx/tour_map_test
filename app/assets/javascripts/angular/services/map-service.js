angular_test.service('Map', function($q) {
    this.markers = []
    this.wayPoints = []
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            scrollwheel: true,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById('map'), options
            );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(marker) {
        var position = new google.maps.LatLng(marker.lat, marker.lng)
        this.marker = new google.maps.Marker({
            map: this.map,
            position: position,
            animation: google.maps.Animation.DROP,
            draggable: true
        });
        this.map.setCenter(position);
    }

    this.createTour = function(tour){
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: this.map
        });
        directionsDisplay.setMap(this.map);

        this.wayPoints = tour.tourMarkers.map(function(marker) {
            return {
                location: new google.maps.LatLng(marker.lat, marker.lng), 
                stopover: true
            }
        });

        if(tour.tourMarkers.length > 1) {
            var origin = tour.tourMarkers[0]
            var dest = tour.tourMarkers[tour.tourMarkers.length -1]
        } else if(tour.tourMarkers.length == 1){
            var dest = origin = tour.tourMarkers[0]
        }

        var options = {
          origin: origin ? origin.name : "",
          destination: dest ? dest.name : (origin ? origin.name : ""),
          waypoints: dest == origin ? [] : this.wayPoints,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }

        directionsService.route(options, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                toastr.error('Directions request failed due to ' + status)
            }
        });
    }

});