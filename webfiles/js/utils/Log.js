/**
 * Description:Class de log para registra eventos
 * Auth:  Emerson Alves Rodrigues
 * Date : 14/09/2018 11:47
 */


const level = {
    AVISO: "aviso",
    ALERTA: "alerta",
    INFORMACAO: "informacao",
    SISTEMA: "sistema",
};

const logType = {
    PROCESS: 1,
    INSERT: 2,
    QUERY: 3,
    UPDATE: 4,
    DELETE: 5,
    ERROR: 6,
    FATAL_ERROR: 7,
};

class Log {

    /**
     *
     * @param message
     * @param level
     * @param logType
     * @param data
     */
    static write(message, level,logType, data = null) {

        const logs = Session.get("report-logs");

        const userId =  Session.get("user").length === 0 ? null : Session.get("user").idUser;

        logs.push({
            message: message,
            date: DateCustom.getNow(),
            userId: userId,
            level: level,
            logType: logType,
            data: data,
        });

        Session.set("report-logs",logs);
    }

    static prepareToSendLog(){

        const logs = Session.get("report-logs");

        if(logs.length > 0) {

            new LogController().insertMany(logs).then(result => {
                if (result.status)
                    Session.delete("report-logs");
            });
        }
    }
}