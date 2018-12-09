let numberViews = 0;
let pages = [];

const viewController = {
    set nameView(name) {
        viewController.events.map(event => {
            if (event.callback !== undefined && event.name === name)
                event.callback(viewController.getParams(name));
        });
    },
    eventsBack: {},
    events: [],
    setObserver: (name, callback) => {
        viewController.events.push({name, callback});

        if (callback !== undefined)
            setTimeout(function () {
                callback(viewController.getParams(name));
            }, 300);
    },
    params: {},
    addParams: (nameView, param) => {
        viewController.params[nameView] = param;
    },
    getParams: (name) => {
        return viewController.params[name] !== undefined ? viewController.params[name] : [];
    },
    onBack: (callback) => {
        viewController.eventsBack[viewController.nameView] = callback;
    },
    goBack: ()=>{
        const event = viewController.eventsBack[viewController.nameView];

        if(event){
            event();
            viewController.eventsBack[viewController.nameView] = undefined;
        }
    }
};

const layoutBuild = (views, js = [], css = [], inBack = false) => {
    const elementProperty = new ElementProperty();

    if (!inBack)
        pages.push({views, js, css});

    css.map(item => {
        Route.importStyleByName(item);
    });

    views.map((view) => {

        const nameComponent = view.replace("/", "-");

        if (document.getElementsByClassName(`view-${nameComponent}`).length > 0) {
            elementProperty.getElement(`.view-${nameComponent}`, element => {
                element.style.display = "";
            });
            return;
        }

        $("#containerViews").append(`<div id="includeContainer${numberViews}" class="view-${nameComponent} views-dynamic"></div>`);

        renderView(view, numberViews);
        numberViews++;
    });

    Route.waitView().then(() => {
        js.map(item => {
            Route.importScriptByName(item);
        });
    });
};

const renderView = (view, id) => {

    $("#includeContainer" + id).load(`views/${view}.html`, function (response) {
        document.getElementById("includeContainer" + id).innerHTML = response;
    });
};