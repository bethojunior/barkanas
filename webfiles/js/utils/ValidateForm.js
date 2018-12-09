class ValidateForm{

    static validateNameComplete(name){
        return name.split(" ").length > 1;
    }

    static validateEmail(email){
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    static validatePhone(phone){
        const regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        return regex.test(phone);
    }


    static validateCpf(cpf){
        let sum = 0;
        let rest;
        let i;

        if (cpf === "00000000000") return false;

        for (i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11))  rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10)) ) return false;

        sum = 0;
        for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11))  rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
    }

}