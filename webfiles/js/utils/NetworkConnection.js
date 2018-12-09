class NetworkConnection {

    constructor() {
        this.status = false;
        this.timeout = 1000;
        this.OPEN = 0;
        this.READY = 1;
        this.CLOSE = 3;
        this.existConnection = false;
        this.amountConnection = 0;
        this.elementProperty = new ElementProperty();
    }

    /**
     *
     * @returns {Promise<Response>}
     */
    check() {
        return new Promise((resolve, reject) => {
            setTimeout(this.timeout, () => {
                reject(new Error("timeout"));
            });
            fetch(API_HOST, {method: "GET"}).then(resolve, reject);
        });
    }

    obeserverConnection(callbackSuccess, callbackFail) {

        const _that = this;

        /*   const connection = new WebSocket(SOCKET_HOST);


           setTimeout(function () {
               if (_that.OPEN === connection.readyState ||  _that.READY === connection.readyState) {
                   _that.removeMessageWithoutNetwork();
                   if (callbackSuccess !== undefined)
                       callbackSuccess();
               }
           }, 300);

          connection.onopen = function () {

               Log.write("Conectou com socket", level.INFORMACAO, logType.PROCESS, connection)

               _that.removeMessageWithoutNetwork();
               if (callbackSuccess !== undefined)
                   callbackSuccess();
           };

           connection.onerror = function () {
               Log.write("error ao tentar conectar", level.INFORMACAO, logType.PROCESS, connection)
               console.log("error ao tentar conectar");
               connection.close();
           };

           connection.onclose = function (e) {

               Log.write("Reconectando com servidor", level.INFORMACAO, logType.PROCESS, connection)

               if (callbackFail !== undefined)
                   callbackFail();
               _that.showMessageWithoutNetwork();

               setTimeout(function () {
                   _that.obeserverConnection(callbackSuccess, callbackFail);
               }, 1000);
           };*/

        const pusher = new Pusher(keyDriver, {
            cluster: 'us2',
            encrypted: true
        });

        pusher.connection.bind('connected', function () {
            _that.removeMessageWithoutNetwork();
            _that.existConnection = true;
            if (callbackSuccess !== undefined)
                callbackSuccess();
        });

        pusher.connection.bind('unavailable', function () {

            Log.write("Falha de conexão", level.INFORMACAO, logType.PROCESS);

            _that.showMessageWithoutNetwork();
            _that.existConnection = false;
            if (callbackFail !== undefined)
                callbackFail();
        });

        pusher.connection.bind( 'error', function( err ) {
            console.log(err);
        });

        /*pingTest();

        function pingTest() {
            const pingManager = new Ping();
            pingManager.ping([{query: "taxireturn.com.br", timeout: 1,retry: 1,version:'v4'}], function (result) {
                console.log(result);

                if(result[0].response.status !== "timeout") {
                    Log.write("Ping com sucesso ", level.INFORMACAO, logType.PROCESS, result);
                }else{
                    Log.write("Ping com falha ", level.INFORMACAO, logType.PROCESS, result);
                }
                setTimeout(pingTest, 2000);
            }, function (error) {
                console.log(error);
                Log.write("Ping com falha ", level.INFORMACAO, logType.PROCESS, error);
                setTimeout(pingTest, 2000);
            });
        }*/

    }

    removeMessageWithoutNetwork() {
        this.amountConnection = 0;
        this.existConnection = true;
        this.elementProperty.getElement(".status-network", element => {
            element.classList.remove("active");
        });
    }

    showMessageWithoutNetwork() {
        this.existConnection = false;

        /*if (document.getElementsByClassName("without-network-toast").length === 0)
            Materialize.toast('<span class="without-network-toast" ' +
                'style="width: 100%;text-align: center;background-color: red;position: absolute;left:  0;top: 0;bottom: ' +
                ' 0;line-height:  13vw;font-weight: bold;">Sem conexão</span>');*/
        this.elementProperty.getElement(".status-network", element => {
            element.classList.add("active");
        });
    }
}