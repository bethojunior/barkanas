class DateCustom{

    static SUNDAY(){
        return 0;
    }
    static FRIDAY(){
        return 5;
    }
    static SATURDAY(){
        return 6;
    }

    static getNow(){
        const date = new Date();

        return `${date.getFullYear()}-${Mask.digitsToTheLeft(2,date.getMonth() + 1)}-${Mask.digitsToTheLeft(2,date.getDate())}`+
            ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}:${Mask.digitsToTheLeft(2,date.getSeconds())}`;
    }

    /**
     * Retorna o tempo
     * @param dateCustom
     * @returns {string}
     */
    static getTimeNow(dateCustom = false){

        const date = !dateCustom ? new Date() : new Date(dateCustom);

        return ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}`;
    }

    /**
     * retorna a data formatada  no formator americano
     * @returns {string}
     */
    static getDate(){
        const date = new Date();

        return `${date.getFullYear()}-${Mask.digitsToTheLeft(2,date.getMonth() + 1)}-${Mask.digitsToTheLeft(2,date.getDate())}`;
    }

    /**
     * retorna a data formatada  no formator br
     * @param date
     * @returns {string}
     */
    static formatDate(date){

        return `${Mask.digitsToTheLeft(2,date.getDate())}/${Mask.digitsToTheLeft(2,date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    /**
     * retorna a data e tempo formatada  no formator br
     * @returns {string}
     */
    static formatDateTime(){
        const date = new Date();
        return `${Mask.digitsToTheLeft(2,date.getDate())}/${Mask.digitsToTheLeft(2,date.getMonth() + 1)}/${date.getFullYear()}`+
            ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}`;
    }

    /**
     * Retorna a data menos algum dias
     * @param days
     * @returns {string}
     */
    static getDateLessDays(days){
        const date = new Date();

        date.setDate(date.getDate() - days);

        return `${date.getFullYear()}-${Mask.digitsToTheLeft(2,date.getMonth() + 1)}-${Mask.digitsToTheLeft(2,date.getDate())}`;
    }

    /**
     *
     * @param dateStart
     * @param dateEnd
     * @returns {*}
     */
    static compareDateStartAndDateEnd(dateStart,dateEnd){
        if(dateStart.length === 0 || dateEnd.length === 0)
            return {status:false,message: "Data não informada"};

        return {status: dateStart <= dateEnd, message: "Data inicial não pode ser maior que a data final"};
    }

    static compareAmountDays(dateStart,dateEnd){
        dateStart = new Date(dateStart);
        dateEnd = new Date(dateEnd);

       const timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());

       return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    /**
     * Retorna data util
     * @returns {Date}
     */
    static getBusinessDay(){
        const date = new Date();

        const weekDay = date.getDay();

        switch (weekDay) {
            case DateCustom.SUNDAY(): {
                date.setDate(date.getDate() + 1);
                break;
            }
            case DateCustom.SATURDAY(): {
                date.setDate(date.getDate() + 2);
                break;
            }
            case DateCustom.FRIDAY(): {
                date.setDate(date.getDate() + 3);
                break;
            }
        }

        return date;

    }
}
