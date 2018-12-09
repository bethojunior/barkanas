class Mask {

    static setMaskPhone(name) {
        $(name).mask(function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        }, {
            onKeyPress: function (val, e, field, options) {
                field.mask(function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                }.apply({}, arguments), options);
            }
        });
    }


    static digitsToTheLeft(amount, text) {
        return ("00" + text).slice(-amount);
    }

    /**
     *
     * @param value {Number}
     * @returns {string}
     */
    static maskMoney(value) {

        let number = value.toFixed(4).split(".");

        number = parseFloat(`${number[0]}.${number[1].slice(0, 2)}`);

        number = number.toFixed(2).split('.');
        number[0] = number[0].split(/(?=(?:...)*$)/).join('.');
        return number.join(',');
    }

    static setMaskCpf(name) {
        $(name).mask('000.000.000-00', {reverse: true});
    }


    /**
     *
     * @param nameElement {String}
     */
    static setMoneyField(nameElement) {
        const elementProperty = new ElementProperty();

        elementProperty.getElement(nameElement, element => {
            element.type = 'tel';
            element.value = '0,00';
            element.setAttribute("max-value", "100000");
        });

        elementProperty.addEventInElement(nameElement, "onclick", function () {
            this.selectionStart = this.selectionEnd = this.value.toString().length;
        });

        elementProperty.addEventInElement(nameElement, "onkeyup", function (event) {

            const maxValue = parseFloat(this.getAttribute("max-value"));

            const valueText = this.value.replace(/\./g, "").replace(/\,/g, ".");

            let digit = 10;

            if (!valueText.includes(".")) {
                digit = 0.01;
            }
            if (event.keyCode === 8) {
                digit = 0.1;
            }
                /*if ([13, 229].includes(event.keyCode)) {
                digit = 1;
            }*/
            const newValue = parseFloat(valueText) * digit;

            const value = newValue > maxValue ? maxValue : newValue;

            if (isNaN(value))
                return;

            const valueInArray = value.toFixed(2).toString().replace(/\./g, ",").split(",");

            const valueRest = valueInArray[1];

            const valueInteger = valueInArray[0];

            let newValueFormat = "";

            valueInteger.split("").reverse().map((number, index) => {
                if (index !== 0 && index % 3 === 0) {
                    newValueFormat = "." + newValueFormat;
                }

                newValueFormat = number + newValueFormat;
            });

            newValueFormat = newValueFormat + "," + valueRest;

            this.value = newValueFormat;

        });
    }

    /**
     *
     * @param elementName {String}
     * @param value {number}
     */
    static setMaxValue(elementName, value) {
        const elementProperty = new ElementProperty();

        elementProperty.getElement(elementName, element => {
            element.setAttribute("max-value", value)
        })
    }

    /**
     * retorna o valor sem mascara
     * @param value {String}
     * @returns {number}
     */
    static removeMaskMoney(value) {
        return parseFloat(value.replace(/\./g, "").replace(/\,/g, "."));
    }
}