class TakeScreen {
    static shot(){
        return new Promise(resolve => {
            navigator.screenshot.URI(function(error,res){
                resolve(res.URI);
            },50);
        });
    }
}