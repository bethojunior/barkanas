class Position {

    constructor() {
        this.currentPosition = null;
        this.lastPosition = null;
        this.watchPosition = null;
    }

    /*getCurrent(callback = function () {
    }) {

        const _that = this;
        gpsDetect.checkGPS(function (enabled) {
            if (enabled) {

                navigator.geolocation.clearWatch( _that.watchPosition);

                _that.watchPosition = navigator.geolocation.watchPosition(result => {

                    _that.lastPosition = _that.currentPosition;

                    _that.currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude,
                        speed: result.coords.speed,heading: result.coords.heading};

                    callback(_that.currentPosition);
                },err => {
                    console.log(err)

                }, {
                    timeout: 3000,
                    maximumAge:0,
                    enableHighAccuracy:true
                });
                return;
            }

            SwalCustom.messageDialog("Por favor, habilite o seu gps !", "Não foi possível obter sua localização", function () {
                _that.getCurrent(callback)
            });
        });

    }*/

    getCurrent(resolve,reject) {

        const _that = this;
        _that.verifyGps().then(function () {
            navigator.geolocation.watchPosition(result => {
                _that.lastPosition = _that.currentPosition;

                _that.currentPosition = {
                    lat: result.coords.latitude, lng: result.coords.longitude,
                    speed: result.coords.speed, heading: result.coords.heading
                };

                resolve(_that.currentPosition);
            }, err => {
                console.log(err);
                reject();
            }, {
               // timeout: 3000,
                maximumAge: 0,
                enableHighAccuracy: true
            });
        }).catch(() => {
            SwalCustom.messageDialog("Por favor, habilite o seu gps !", "Não foi possível obter sua localização", function () {
                reject();
            });
        });

    }

    verifyGps() {
        return new Promise((resolve, reject) => {
            gpsDetect.checkGPS(function (enabled) {
                if (enabled) {
                    resolve();
                    return;
                }
                reject();
            });
        })
    }

    static getCurrentMap() {

        const _that = this;

        return new Promise((resolve, reject) => {
            gpsDetect.checkGPS(function (enabled) {
                if (enabled) {

                    navigator.geolocation.getCurrentPosition(result => {

                        _that.lastPosition = _that.currentPosition;

                        _that.currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude};

                        resolve(_that.currentPosition);
                    }, function (err) {
                        reject(err)
                    }, {
                        timeout: 3000,
                        maximumAge: 0,
                        enableHighAccuracy: true
                    });
                    return;
                }

                SwalCustom.messageDialog("Por favor, habilite o seu gps !", "Não foi possível obter sua localização", function () {
                    reject("GPS desativado");
                });
            });
        });

    }


    waitPositionCurrent(callback = function () {
    }) {
        const _that = this;
        navigator.geolocation.watchPosition(result => {
            _that.lastPosition = _that.currentPosition;

            _that.currentPosition = {lat: result.coords.latitude, lng: result.coords.longitude};

            callback(_that.currentPosition);
        }, function () {
            console.log("error na localização")
        }, {enableHighAccuracy: true});
    }

    getDistanceLocation(location1,location2) {

        let deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            },
            R = 6371,
            dLat = deg2rad(location1.lat - location2.lat),
            dLng = deg2rad(location1.lng - location2.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(location2.lat))
                * Math.cos(deg2rad(location2.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseInt((R * c * 1000).toFixed());
    }

    getDistanceFromLatLonInMeters() {
        if (this.lastPosition === null)
            return;
        if (this.currentPosition === null)
            return;


        let deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            },
            R = 6371,
            dLat = deg2rad(this.lastPosition.lat - this.currentPosition.lat),
            dLng = deg2rad(this.lastPosition.lng - this.currentPosition.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(this.currentPosition.lat))
                * Math.cos(deg2rad(this.currentPosition.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseInt((R * c * 1000).toFixed());
    }
}