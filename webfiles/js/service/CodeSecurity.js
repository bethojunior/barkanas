class CodeSecurity {

    static clearConfirmationCode(text){
        const code = text.split("-");

        const aux = code[1];
        code[1] = code[3];
        code[3] = aux;

        return code.join("-");
    }
}