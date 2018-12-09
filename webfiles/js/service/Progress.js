class Progress{
    constructor(){
        this.ids = [];
        this.timeout = undefined;
    }

    /**
     *
     * @param timeInSeconds
     * @param data
     * @param callback
     */
    progressTime(timeInSeconds,callback,data = null){
        let _that = this;
        const object = {
            finishProgres  : false,
            dateStart :  new Date(),
            lastDate : new Date(),
            newDate : null,
            finishDate : new Date(),
            progress: 0,
            timeout : null,
            timeSpent: ''
        };

        object.finishDate.setSeconds(object.finishDate.getSeconds() + (timeInSeconds/1000));

        if(data !== null){
            object.dateStart = new Date(data.dateStart);
            object.finishDate = new Date(data.finishDate);
        }

        _that.timeout = new Worker("webfiles/js/worker/progress.js");

        _that.timeout.onmessage = function () {
            object.lastDate = new Date();

            let diff = object.lastDate.getTime() - object.dateStart.getTime();

            object.timeSpent = _that.timeDiff(diff);

            object.percent = (diff * 100) / timeInSeconds;

            object.newDate =  new Date();

            object.newDate.setTime(timeInSeconds - diff);

            if (object.lastDate.getTime()  >= object.finishDate.getTime()) {
                object.finishProgres = true;
                object.percent = 100;
                callback(object);
                _that.stopProgress();
                return;
            }
            callback(object);
        }
    }


    /**
     *  Conta em um tempo indefinido
     * @param callback
     * @param date
     */
    progressUndefined(callback,date = null){
        let _that = this;

        if(date !== null){
            date = new Date(date);
        }

        if(date === null) {
            date = new Date();
        }
        const object = {
            dateStart :  date,
            dateEnd : new Date(),
            timeSpent: ''
        };

        _that.timeout = new Worker("webfiles/js/worker/progress.js");

        _that.timeout.onmessage = function() {
            object.dateEnd = new Date();

            let diff = object.dateEnd.getTime() - object.dateStart.getTime();

            object.timeSpent = _that.timeDiff(diff);

            callback(object);
        }
    }

    /**
     *  Conta em um tempo indefinido
     * @param callback
     * @param date
     */
    progressLocation(callback,date = null){
        let _that = this;

        if(date !== null){
            date = new Date(date);
        }

        if(date === null) {
            date = new Date();
        }
        const object = {
            dateStart :  date,
            dateEnd : new Date(),
            timeSpent: ''
        };

        _that.timeout = new Worker("webfiles/js/worker/location.js");

        _that.timeout.onmessage = function() {
            object.dateEnd = new Date();

            let diff = object.dateEnd.getTime() - object.dateStart.getTime();

            object.timeSpent = _that.timeDiff(diff);

            callback(object);
        }
    }

    /**
     * Para o progresso
     */
    stopProgress(){
        if(this.timeout === undefined){
            return;
        }
        this.timeout.terminate();
        this.timeout = undefined;
    }


    /**
     *
     * @param percent
     */
    setProgress(percent) {
        let circle = document.querySelector('circle');
        let radius = circle.r.baseVal.value;
        let circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        circle.style.strokeDashoffset = circumference - percent / 100 * circumference;

    }

    timeDiff(diff){
        diff = diff/1000;

        const minutes = parseInt(diff/60);
        const seconds = parseInt(diff%60);

        return `${Mask.digitsToTheLeft(2,minutes)}:${Mask.digitsToTheLeft(2,seconds)}`;
    }
}