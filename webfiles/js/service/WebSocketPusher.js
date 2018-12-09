const keyChatDev        = "d972017e7893eac71c31";
const keyChatProduction = "dda2d265e1ce9b51048f";

const keyDriverDev        = "c414d69103e005ceacf8";
const keyDriverProduction = "ef047389d188073c1402";

const keyTripDev        = "55d92b9e36d1bd828212";
const keyTripProduction = "d18413a6f1df893db951";

const keyTrip = (IS_HOST_ENVIRONMENT_TEST) ? keyTripDev : keyTripProduction;
const keyDriver = (IS_HOST_ENVIRONMENT_TEST) ? keyDriverDev : keyDriverProduction;
const keyChatTrip = (IS_HOST_ENVIRONMENT_TEST) ? keyChatDev : keyChatProduction;

class WebSocketPusher{
    constructor(key){
        Pusher.logToConsole = false;

        this.pusher = new Pusher(key, {
            cluster: 'us2',
            encrypted: true
        });

        this.channel = null;
    }

    setChannel(nameChannel){
        if(IS_HOST_ENVIRONMENT_TEST)
            nameChannel = nameChannel.concat("-dev");

        this.channel =  this.pusher.subscribe(nameChannel);
    }

    observerSocket(event,callback){
        this.stopWebSocket(event);
        this.channel.bind(event,callback);
    }

    stopWebSocket(event){
        this.channel.unbind(event);
    }


}