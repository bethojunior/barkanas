class UserController{
    /**
     *
     * @param email
     * @returns {Promise<any>}
     */
    checkEmail(email) {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('User/CheckEmail', 'POST',{email},resolve);
        });
    }
}