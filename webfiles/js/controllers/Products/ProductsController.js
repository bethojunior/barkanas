class ProductsController {
    static getProducts(){
        return new Promise((resolve , reject) => {
            ConnectionServer.sendRequest('Products/GetAll' , 'POST' , null , resolve , reject);
        });
    }

}