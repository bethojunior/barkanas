class ProductsController {
    static getDrinks(){
        return new Promise((resolve , reject) => {
            ConnectionServer.sendRequest('Products/GetDrinks' , 'POST' , null , resolve , reject);
        });
    }
    static getSnacks(){
        return new Promise((resolve , reject) => {
            ConnectionServer.sendRequest('Products/GetSnacks' , 'POST' , null , resolve , reject);
        });
    }
}