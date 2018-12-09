class PreloaderCustomer{
    static show(){
        new ElementProperty().getElement("#preloadLogin", element => {
            element.classList.add("active");
        });
    }

    static hidden(){
        new ElementProperty().getElement("#preloadLogin", element => {
            element.classList.remove("active");
        });
    }
}