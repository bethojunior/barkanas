class EventTouche{
    constructor(){
        this.lastY = null;
    }

    addEventDistanceVertical(name,callback){
        const element = $(name);
        const _that = this;

        element.bind('touchstart', function (e) {
            _that.lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
        });

        element.on('touchstart', function (e) {
            let swipe = e.originalEvent.touches,
                start = swipe[0].pageY;

            $(this).on('touchmove', function (e) {

                let contact = e.originalEvent.touches,
                    end = contact[0].pageY,
                    distance = end - start;

                callback(distance,this)
            }).one('touchend', function () {
                $(this).off('touchmove touchend');
            });
        });
    }

    addEventDistanceHorizontal(name,distanceActiveLeft,distanceActiveRight,callback){
        const element = $(name);
        const _that = this;
        let result = false;

        element.bind('touchstart', function (e) {
            _that.lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });

        element.on('touchstart', function (e) {
            let swipe = e.originalEvent.touches,
                start = swipe[0].pageX;

            $(this).on('touchmove', function (e) {
                if(result)
                    return;

                let contact = e.originalEvent.touches,
                    end = contact[0].pageX,
                    distance = end - start;

                if(distance < distanceActiveLeft) {
                    result = true;
                    callback(distance, this,"left");

                }

                if(distance > distanceActiveRight){
                    result = true;
                    callback(distance, this,"right");

                }
            }).one('touchend', function () {
                $(this).off('touchmove touchend');
                result = false;
            });
        });
    }


    addEventDistanceTop(name,distanceActiveTop,callback){
        const element = $(name);
        const _that = this;
        let result = false;

        element.unbind('touchstart');

        element.bind('touchstart', function (e) {
            _that.lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        });

        element.on('touchstart', function (e) {
            let swipe = e.originalEvent.touches,
                start = swipe[0].pageY;

            $(this).on('touchmove', function (e) {
                if(result)
                    return;

                let contact = e.originalEvent.touches,
                    end = contact[0].pageY,
                    distance = end - start;

                if(distance < distanceActiveTop){
                    result = true;
                    callback(distance);
                }
            }).one('touchend', function () {
                $(this).off('touchmove touchend');
                result = false;
            });
        });
    }
}