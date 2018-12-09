const elementProperty = new ElementProperty();

$(document).ready(function(){
    $('ul.tabs').tabs();
    $(".button-collapse").sideNav();
});

elementProperty.addEventInElement('#loadDrinks' , 'onclick' , data => {
    let mountList = '';
    ProductsController.getDrinks().then(resolve => {
        if(resolve.status){
            data = resolve.data;
            console.log(data);
            data.map(res => {
                mountList += `
                    <div id="${res.id}" class="col s12 card cardDrinks">
                        <div class="col s8">
                            <span><b>${res.name}</b></span>
                            <div class="divider"></div>
                            <span>R$${FormatNumber.cash(res.this_value)}</span>
                            <br>
                            <span>${res.description}</span>
                        </div>
                        <div class="col s4"><img width="60vw" class="responsive-img" src="${PATH_IMAGE+res.photo}"></div>
                    </div>
                `;
            });

            elementProperty.getElement('#drinks' , element => {
               element.innerHTML = mountList;
            });

            elementProperty.addEventInElement('.cardDrinks' , 'onclick' , function () {
                id = this.getAttribute("id");
                alert(id);
            });

        }
    },reject => {
        console.log(reject)
    });

});

elementProperty.addEventInElement('#loadSnacks' , 'onclick' , data => {
    let mountList = '';
    ProductsController.getSnacks().then(resolve => {
        if(resolve.status){
            data = resolve.data;
            console.log(data);
            data.map(res => {
                mountList += `
                    <div class="col s12 card">
                        <div class="col s8">
                            <span><b>${res.name}</b></span>
                            <div class="divider"></div>
                            <span>R$${FormatNumber.cash(res.this_value)}</span>
                            <br>
                            <span>${res.description}</span>
                        </div>
                        <div class="col s4"><img width="60vw" class="responsive-img" src="${PATH_IMAGE+res.photo}"></div>
                    </div>
                `;
            });

            elementProperty.getElement('#snacks' , element => {
                element.innerHTML = mountList;
            });
        }
    },reject => {
        console.log(reject)
    });

});