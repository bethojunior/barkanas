class ChatNotification {
    constructor() {
        this.chatTripSocket = new WebSocketPusher(keyChatTrip);

        this.chatTripSocket.setChannel("chat-channel");

        this.elementProperty = new ElementProperty();

        this.timeNotificationChat = null;

        this.userLogged = Session.get("user");

        this.tripChat = null;
    }

    observerNotification(trip, callbackMessage, callbackIgnore) {
        const _that = this;

        this.tripChat = trip;

        _that.chatTripSocket.observerSocket(trip.tripReference, result => {

            _that.elementProperty.getElement(".name-client-notification", element => {
                element.innerHTML = trip.customerName;
            });
            _that.elementProperty.addEventInElement(".go-chat-notification", "onclick", function () {
                if (callbackMessage !== undefined)
                    callbackMessage();

                _that.elementProperty.getElement(".container-notification-chat", element => {
                    element.classList.remove("active")
                });
            });
            _that.elementProperty.addEventInElement(".close-notification-chat", "onclick", function () {
                if (callbackIgnore !== undefined)
                    callbackIgnore();

                _that.elementProperty.getElement(".container-notification-chat", element => {
                    element.classList.remove("active")
                });
            });
            _that.elementProperty.getElement(".time-notification", element => {
                element.innerHTML = DateCustom.getTimeNow(result.message.date);
            });
            _that.elementProperty.getElement(".message-client-notification", element => {
                element.innerHTML = result.message.message;
            });

            if (result.message.userId !== _that.userLogged.idUser) {

                _that.elementProperty.getElement(".amount-msg", element => {
                    const amountNotification = parseInt(element.innerHTML);
                    element.innerHTML = isNaN(amountNotification) ? 1 : amountNotification + 1;
                });

                _that.elementProperty.getElement(".container-notification-chat", element => {
                    if (!element.classList.contains("active")) {
                        element.classList.add("active");

                        if (_that.timeNotificationChat !== null)
                            clearTimeout(_that.timeNotificationChat);

                        _that.timeNotificationChat = setTimeout(function () {
                            element.classList.remove("active");
                        }, 10000);

                    }
                });
            }
        });
    }

    closeChat(){
        this.chatTripSocket.stopWebSocket(this.tripChat.tripReference);

        this.elementProperty.getElement(".container-notification-chat", element => {
            element.classList.remove("active")
        });

        this.elementProperty.getElement(".amount-msg", element => {
            element.innerHTML ='';
        });
    }
}