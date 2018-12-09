class Route {

    static getClassAndAction(url) {
        if (url === undefined)
            url = window.location.href;

        url = url.toString();
        let length = (url.split("/").length - 1);
        url = url.split("/");

        let path = url[length - 1] + '/' + url[length];

        path = path.split("?");

        if (path[1] === undefined) {
            if (Session.get("user").idUser !== undefined) {
                return {
                    className: 'Driver',
                    classView: 'DriverView',
                    actionName: 'actionIndex'
                }
            }
            return {
                className: 'Main',
                classView: 'MainView',
                actionName: 'actionIndex'
            }
        }

        let route = path[1].split("&");

        let action = 'actionIndex';

        if (route[1] !== undefined) {
            action = "action" + route[1];
        }

        return {
            className: route[0],
            classView: route[0] + 'View',
            actionName: action
        }
    }

    static importScriptByName(className, callback = function () {
    }) {

        const nameComponent = className.replace(/\//g, "-");

        if (document.getElementsByClassName(nameComponent).length > 0)
            return;

        const my_awesome_script = document.createElement('script');

        my_awesome_script.setAttribute('src', `webfiles/js/${className}.js`);

        my_awesome_script.setAttribute('class', `${nameComponent}`);

        my_awesome_script.async = true;

        my_awesome_script.defer = true;

        document.body.appendChild(my_awesome_script);

        my_awesome_script.addEventListener('load', callback);

    }


    static importScriptByUrl(url, id) {
        return new Promise(resolve => {
            if (document.getElementById(id) !== null) {
                resolve();
                return;
            }


            const my_awesome_script = document.createElement('script');

            my_awesome_script.setAttribute('src', url);

            my_awesome_script.setAttribute('id', id);

            my_awesome_script.async = true;

            my_awesome_script.defer = true;

            document.body.appendChild(my_awesome_script);


            my_awesome_script.addEventListener('load', resolve);
        });

    }

    static importStyleByName(className) {
        const my_awesome_script = document.createElement('link');

        my_awesome_script.setAttribute('rel', `stylesheet`);

        my_awesome_script.setAttribute('href', `webfiles/css/${className}.css`);

        my_awesome_script.setAttribute('id', `css${className}`);

        if (document.getElementById(`css${className}`) !== null)
            return;

        document.head.appendChild(my_awesome_script);
    }

    static redirect(className, actionName = '') {
        if (actionName !== '') {
            actionName = "&" + actionName
        }

        window.location = `?${className}${actionName}`;
    }

    static startView(className, actionName) {
        if (actionName !== '') {
            actionName = "&" + actionName
        }

        webview.Show(`index.html?${className}${actionName}`);
    }

    static waitView() {
        return new Promise(resolve => {
            setTimeout(function () {
                resolve();
            }, 300);
        })
    }

    static pageDynamic() {
        const elementProperty = new ElementProperty();

        elementProperty.getElement("a", element => {
            if (element.getAttribute("href") === null)
                return;
            element.onclick = function (event) {
                event.preventDefault();

                Route.renderViewDynamic(this.getAttribute("href"));

            };
        });
    }

    static renderViewDynamic(url){
        const elementProperty = new ElementProperty();
        elementProperty.getElement(".menu-close", menuClose => {
            elementProperty.getElement(".container-menu-options", menuOptions => {
                menuOptions.classList.remove("active");
            });

            menuClose.classList.remove("open");
        });

        elementProperty.getElement(".views-dynamic",view=>{
            view.style.display = "none";
        });
        elementProperty.getElement(".status-running",view=>{
            view.style.display = "none";
        });

        const route = Route.getClassAndAction(url);
        ManagerView[route.classView][route.actionName]();
    }

    static redirectDynamic(className, actionName = '') {
        if (actionName !== '') {
            actionName = "&" + actionName
        }

        Route.renderViewDynamic(`/index.html?${className}${actionName}`);
    }

    static backPage(){
        const elementProperty = new ElementProperty();

        if(pages.length - 1 === 1){
            elementProperty.getElement(".status-running",view=>{
                view.style.display = "block";
            });
        }

        if(pages.length === 1) {
            window.plugins.appMinimize.minimize();
            return;
        }

        const amount = pages.length - 1;

        pages.splice(amount , 1);
        if(pages.length === 0){
            window.plugins.appMinimize.minimize();
            return;

        }

        const page = pages[amount - 1];

        elementProperty.getElement(".views-dynamic",view=>{
            view.style.display = "none";
        });

        viewController.goBack();

        layoutBuild(page.views,page.js,page.css,true);
    }

    static goHomeBack(){
        const elementProperty = new ElementProperty();

        const page = pages[0];

        pages = [page];

        elementProperty.getElement(".views-dynamic",view=>{
            view.style.display = "none";
        });

        layoutBuild(page.views,page.js,page.css,true);

    }
}