
class FormatNumber {

    static cash(num){
        var numero = parseFloat(num);
        var numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
    
}
