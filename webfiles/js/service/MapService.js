class MapService {
    constructor() {
        this.directionsService = null;
        this.directionsDisplay = null;

        this.lastPosition = null;

        this.positionDriver = null;

        this.positionDestination = null;

        this.map = null;

        this.zoomPoints = false;

        this.setting = Session.get("setting");

        if (this.setting.length === 0) {
            this.setting = {
                zoom: 16,
                rota: 20,
                giro: 1
            }
        }

        this.zoom = 16;

        this.destination = null;

        this.mapIsActive = false;

        this.car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";

        this.iconDriver = {
            path: this.car,
            scale: .7,
            strokeColor: '#9a5e00',
            strokeOpacity: 1,
            strokeWeight: .7,
            fillOpacity: 1,
            fillColor: '#ff9a00',
            offset: '5%',
            // rotation: parseInt(heading[i]),
        };
        this.iconHotel = "webfiles/img/icon/car_hotel.png";

        this.existTrip = false;

        this.route = [];

        this.numDeltas = 100;
        this.delay = 5; //milliseconds
        this.index = 0;
        this.deltaLat = 0;
        this.deltaLng = 0;
        this.timeOut = null;

        this.currentPosition = {lat: 0, lng: 0};
        this.futurePosition = null;
    }

    requestAndInitMap(position, callback = function () {
    }) {
        const _that = this;

        try {
            if (google !== undefined) {
                _that.initMap(position, callback);
            }
        } catch (e) {
            Route.importScriptByUrl("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk&libraries=places",
                "scriptMap")
                .then(() => {
                    _that.initMap(position, callback);
                })
        }
    }

    importScriptWithPlaces() {
        return new  Promise((resolve)=>{
            Route.importScriptByUrl("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzYKn0wp3Gl8dcoW3xhLNI7xtufpGIYXk&libraries=places",
                "scriptMapLibraries")
                .then(resolve)
        })
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    initMap(position, callback = function () {
    }) {
        const _that = this;
        if (this.directionsService !== null) {
            this.map.setCenter(position);
            this.map.setZoom(this.setting.zoom);
            return;
        }

        try {

            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({
                map: this.map,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "rgba(255, 154, 0, 0.49)",
                    strokeWeight: 5
                }
            });

            this.map = new google.maps.Map(document.getElementById('map'), {
                center: position,
                zoom: this.setting.zoom,
                disableDefaultUI: true,
                clickableIcons: false,
                styles: [
                    {
                        "featureType": "poi",
                        "stylers": [
                            {"visibility": "off"}
                        ]
                    }
                ]
            });

            this.map.setOptions({
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            })

            this.mapIsActive = true;

            this.directionsDisplay.setMap(this.map);

            this.iconDriver.anchor = new google.maps.Point(10, 25);

            this.lastPosition = position;

            this.currentPosition.lat = position.lat;
            this.currentPosition.lng = position.lng;

            this.positionDriver = new google.maps.Marker({
                position: this.lastPosition,
                map: this.map,
                icon: this.iconDriver
            });

            callback();
        } catch (err) {
            this.mapIsActive = false;
            setTimeout(function () {
                _that.initMap(position, callback);
            }, 500);

        }
    }

    isMapActive() {
        return this.mapIsActive;
    }

    setPositionDriver(position) {
        if (this.positionDriver === null)
            return;

        if (this.existTrip)
            this.verifyRoute(position);

        this.futurePosition = position;

        this.transition();

    }

    transition() {
        clearTimeout(this.timeOut);

        this.index = 0;
        this.deltaLat = (this.futurePosition.lat - this.currentPosition.lat) / this.numDeltas;
        this.deltaLng = (this.futurePosition.lng - this.currentPosition.lng) / this.numDeltas;

        this.moveMarker();
    }

    moveMarker() {

        this.currentPosition.lat = this.currentPosition.lat + this.deltaLat;
        this.currentPosition.lng = this.currentPosition.lng + this.deltaLng;

        const latlng = new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng);

        const last = this.positionDriver.getPosition();

        this.positionDriver.setPosition(latlng);

        this.iconDriver.rotation = google.maps.geometry
            .spherical.computeHeading(last, this.positionDriver.getPosition());


        this.positionDriver.setIcon(this.iconDriver);

        if(!this.zoomPoints) {
            const childrenMap = document.getElementById("map").children[0];
            this.map.setCenter(latlng);
            childrenMap.style.transform = `rotate(${parseInt(this.iconDriver.rotation) * (-1)}deg)`;
            childrenMap.style.transition = `${this.setting.giro}s`;
        }

        if (this.index !== this.numDeltas) {
            this.index++;
            const _that = this;

            this.timeOut = setTimeout(function () {
                _that.moveMarker();
            }, _that.delay);

            return;
        }

        clearTimeout(this.timeOut);
        this.timeOut = null;
    }

    calculateAndDisplayRoute(origin, destination) {
        const _that = this;

        if (_that.directionsService === null)
            return;

        this.destination = destination;

        try {

            _that.directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING',
                provideRouteAlternatives: true,
            }, function (response, status) {
                if (status === 'OK') {

                    const leg = response.routes[0].legs[0];

                    _that.directionsDisplay.setMap(_that.map);

                    _that.route =
                        response.routes[0].overview_path.map(item => {
                            return {lat: item.lat(), lng: item.lng()};
                        });

                    _that.directionsDisplay.setDirections(response);
                    _that.directionsDisplay.setOptions({
                        suppressMarkers: true,
                        preserveViewport: true
                    });

                    if (_that.positionDestination !== null) {
                        _that.positionDestination.setMap(null);
                    }
                    _that.positionDestination = _that.makeMarker(leg.end_location, "", _that.map,
                        _that.iconHotel);

                    _that.existTrip = true;
                }
            });
        } catch (err) {
            setTimeout(function () {
                _that.calculateAndDisplayRoute(origin, destination);
            }, 500);
        }
    }

    makeMarker(position, title, map, icon) {
        return new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            icon: icon
        });
    }

    removeRoute() {
        if (this.positionDestination === null || this.directionsDisplay === null) {
            return;
        }

        this.directionsDisplay.setMap(null);
        this.positionDestination.setMap(null);
        this.route = [];
        this.existTrip = false;
    }


    verifyRoute(position) {
        const _that = this;

        const detailRoute = {
            pointStart: {
                meters: 0,
                position: null,
            },
            pointEnd: {
                meters: 0,
                position: null,
            },
            lastPosition: null
        };

        if (this.route.length === 0)
            return;

        this.route.map(positionRoute => {

            const distance = _that.getDistanceFromLatLonInMeters(position, positionRoute);

            if (distance < detailRoute.pointStart.meters || detailRoute.pointStart.meters === 0) {
                detailRoute.pointStart.meters = distance;
                detailRoute.pointStart.position = positionRoute;
                return;
            }

            if (distance < detailRoute.pointEnd.meters || detailRoute.pointEnd.meters === 0) {
                detailRoute.pointEnd.meters = distance;
                detailRoute.pointEnd.position = positionRoute;
            }

            detailRoute.lastPosition = positionRoute;

        });

        const distanceUser = detailRoute.pointStart.meters + detailRoute.pointEnd.meters;

        const areaRoute =
            _that.getDistanceFromLatLonInMeters(detailRoute.pointEnd.position, detailRoute.pointStart.position) + this.setting.rota;

        let status = " na rota";

        if (!areaRoute)
            return;

        if (distanceUser > areaRoute) {
            status = " recalculado rota";
            _that.calculateAndDisplayRoute(position, _that.destination);
        }

        const route = document.getElementById("route");

        route.innerHTML = `Motorista : ${distanceUser} -  Pontos : ${areaRoute} ` + status;
    }

    getDistanceFromLatLonInMeters(firstPosition, lastPosition) {
        if (firstPosition === null)
            return false;

        if (lastPosition === null)
            return false;


        let deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            },
            R = 6371,
            dLat = deg2rad(lastPosition.lat - firstPosition.lat),
            dLng = deg2rad(lastPosition.lng - firstPosition.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(firstPosition.lat))
                * Math.cos(deg2rad(firstPosition.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseInt((R * c * 1000).toFixed());
    }


    zoomBetweenPoints(){
        const bounds = new google.maps.LatLngBounds();

        bounds.extend(this.positionDriver.getPosition());

        bounds.extend(this.positionDestination.getPosition());

        this.zoomPoints = true;

        this.map.fitBounds(bounds);

        const childrenMap = document.getElementById("map").children[0];

        childrenMap.style.transform = `rotate(0deg)`;
    }

    zoomInDriver(){
        this.map.setCenter(this.positionDriver.getPosition());
        this.map.setZoom(this.setting.zoom);
        const childrenMap = document.getElementById("map").children[0];
        childrenMap.style.transform = `rotate(${parseInt(this.iconDriver.rotation) * (-1)}deg)`;
        this.zoomPoints = false;
    }

}