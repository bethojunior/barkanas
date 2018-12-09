class SwalCustom {
    static dialogConfirm(title, message, callback) {
        swal({
                title: title,
                text: message,
                icon: 'info',
                buttons: {
                    yes: {
                        text: "SIM!",
                        value: true,
                    },
                    no: {
                        text: "NÃO!",
                        value: false,
                    },
                },
            }
        ).then(function (status) {
            callback(status);
        })
    }

    static messageDialog(message,title,callback = function(){},icon = "info"){
        swal({
            title: title,
            text: message,
            icon: icon
        }).then(value => {
            callback();
        });
    }

    /**
     *
     * @param errors {*}
     * @param data {String}
     */
    static showMessageError(errors,data = false){
        let text = errors.message;

        text = !data ? text : text +"\n"+ data;

        text += "\n(" +errors.code+")";

        swal({
            title: "Atenção",
            text,
            icon: "warning"
        })
    }
}