class StatusDriver {

    /**
     *
     * @param driverRegisterStatusId
     * @param isSearchTrip
     * @returns {Promise<any>}
     */
    static verifyStatusDriver(driverRegisterStatusId, isSearchTrip) {

        const dataUser = Session.get("user");
        let reason = "";

        if (dataUser.reasons !== undefined)
            reason = dataUser.reasons.map(res => {
                return `${res.type}`;
            }).join(",");

        return new Promise((resolve, reject) => {
            if (driverRegisterStatusId !== StatusDriver.ACTIVE) {

                if (isSearchTrip === false) {
                    return;
                }

                reject();

                $('#driverBlock').modal('open');

                new ElementProperty().getElement("#messageDenied", element => {

                    switch (driverRegisterStatusId) {

                        case StatusDriver.PENDANT: {
                            element.innerHTML = " Estamos aguardando os seguintes dados: " + reason + ".";
                            break;
                        }

                        case StatusDriver.BLOCKED: {
                            element.innerHTML = " Seu perfil está bloqueado por :";
                            break;
                        }

                        case  StatusDriver.WAITING_FOR_ANSWER: {
                            element.innerHTML = " Em breve você estará disponível para " +
                                " aceitar corridas e aumentar seu lucro mensal.";
                            break;
                        }

                    }
                });

                return;
            }
            resolve();
        });

    }
}

StatusDriver.ACTIVE = 1;
StatusDriver.PENDANT = 2;
StatusDriver.BLOCKED = 3;
StatusDriver.WAITING_FOR_ANSWER = 4;
