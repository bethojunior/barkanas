class Autocomplete extends ElementProperty {
    /**
     * Inicializa o autocomplete
     * @param name {String}
     * @param datas{Array}
     * @param showProperty {String}
     * @param findByProperty {Array}
     * @param showMaxResult
     */
    initAutocomplete(name, datas, showProperty, findByProperty, showMaxResult = 25) {
        const _that = this;

        _that.name = name;

        _that.showProperty = showProperty;

        _that.callback = function () {};

        _that.closeDialogWhenFocusOut(name);

        this.list = datas;

        _that.addEventInElement(name, "oninput", function () {

            const value = this.value;

            const dataSelected = {
                data: [],
                listHtml: ""
            };

            datas.map(data => {
                const exist = findByProperty.some(property => {
                    if (data[property] === undefined)
                        return false;

                    return data[property].toUpperCase().includes(value.toUpperCase());
                });


                if (dataSelected.data.length >= showMaxResult) {
                    return;
                }


                if (exist) {
                    dataSelected.data.push(data);
                    dataSelected.listHtml = dataSelected.
                    listHtml.
                    concat(`<li class="autocomplete-item-${name}" value='${JSON.stringify(data)}'>${data[showProperty]}</li>`);
                }
            });
            _that.showDataSelected(name, dataSelected);
        });
    }

    /**
     *
     * @param value
     * @param column
     */
    setSelectedItem(value,column){
        const _that = this;

        const object = this.list.filter(item => {

            if(item[column] === value){
                return item;
            }
        })[0];

        this.getElement(this.name, element=>{
            if(object !== undefined) {
                element.value = object[_that.showProperty];
                _that.callback(object);
            }
        });
    }

    /**
     * mostra o dialog de opções
     * @param nameElement {String}
     * @param result {Object}
     */
    showDataSelected(nameElement, result) {

        if (document.getElementById(`autocomplete-${nameElement}`) === null) {
            $(nameElement).after(`<ul class='autocomplete-custom' id='autocomplete-${nameElement}'></ul>`);
        }

        this.getElement(`#autocomplete-${nameElement}`, element => {
            element.innerHTML = result.listHtml;
        });

        this.onSelectedItem();

    }

    closeDialogWhenFocusOut(name){
        const _that = this;
        this.addEventInElement(name,"onblur",function(){
            setTimeout(function(){
                _that.getElement(`#autocomplete-${name}`, element => {
                    element.remove();
                });
            },500);
        });
    }

    /**
     * Ao selecionar o item ele retorna um callback com item selecionado
     * @param callback
     */
    getItemSelected(callback){
        this.callback = callback;
    }

    /**
     * Adiciona o evento  de callback ao adicionar os elementos
     */
    onSelectedItem(){
        const _that = this;
        this.addEventInElement(`.autocomplete-item-${this.name}`,"onclick",function(){
            const value = this.innerHTML;

            _that.getElement(_that.name,element=>{
                element.value = value;
            });

            _that.callback(JSON.parse(this.getAttribute("value")));
        });
    }
}
