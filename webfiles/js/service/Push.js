class Push {

    constructor() {

        this.token = null;
        const _that = this;

        this.push = PushNotification.init({
            "android": {
                "senderID": "834472357017",
                "vibrate": true,
                "badge": true,
                "sound": true,
            },
            "ios": {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            },
            "windows": {}
        });

        this.push.on('registration', function (data) {
            _that.token = data.registrationId;
            console.log(data.registrationId);
        });


    }

    getToken() {
        return this.token;
    }

    eventPush(callback) {
        this.push.on('notification', callback);

    }
}