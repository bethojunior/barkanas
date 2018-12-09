class ConnectionServer {
    static Host() {
        return API;
    }

    /**
     *
     * @param url
     * @param method
     * @param params
     * @param callback
     * @param reject
     * @param timeRequest
     * @param isStdObject
     */
    static sendRequest(url, method = "GET", params = {}, callback = function (response) {
    }, reject = false, timeRequest = undefined, isStdObject = false) {

        const data = ConnectionServer.prepareData(method,params,isStdObject);

        if (timeRequest !== undefined) {
            ConnectionServer.timeRequest(timeRequest,url,data,callback,reject);
            return;
        }

        fetch(ConnectionServer.Host() + url, data)
            .then(result =>{

                if(result.status === 401){
                    SwalCustom.messageDialog("Sessão expirada","Ops",()=>{
                        Session.delete("user");
                        location.reload();
                    },"info");
                    return;
                }

                return result.json()
            })
            .then(data => {
                callback(data)
            })
            .catch(error => {


                if (reject !== undefined)
                    reject();
            })
    }

    static prepareData(method,params,isStdObject){
        const headers = method !== "GET" ? {
            'Content-type': 'application/json',
            'token': Session.getValueInSession('user','api_token'),
            'userid': Session.getValueInSession('user','idUser')
        } : {
            'Content-type': 'application/x-www-form-urlencoded',
            'token': Session.getValueInSession('user','api_token'),
            'userid': Session.getValueInSession('user','idUser')
        };

        const data = {
            method: method,
            headers:  new Headers(headers)
        };

        if(method === "POST")
            data.body = ConnectionServer.prepareRequest(params, isStdObject);

        return data;
    }

    static timeRequest(timeRequest,url,data,callback,reject){
        this.timeout(timeRequest, fetch(ConnectionServer.Host() + url, data))
            .then(result => result.json())
            .then(data => {
                callback(data)
            })
            .catch((error) => {

                if (reject !== undefined)
                    reject(error);
            });
    }

    static timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("Problemas com conexão de internet"), true);
            }, ms);
            promise.then(resolve, reject)
        })
    }


    static sendRequestWithFiles(url, method = "GET", formData) {
        return new Promise(resolve => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }
            };
            request.open(method, ConnectionServer.Host() + url, true);
            request.setRequestHeader('token',Session.getValueInSession('user','api_token'));
            request.setRequestHeader('userid',Session.getValueInSession('user','idUser'));
            request.send(formData);
        });
    }

    static prepareRequest(params, isStdObject) {
        if (!isStdObject)
            return JSON.stringify(params);

        if (!Array.isArray(params)) {
            params = [params];
        }
        return JSON.stringify({stdObject: params});
    }
}