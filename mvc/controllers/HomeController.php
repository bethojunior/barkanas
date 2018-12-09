<?php

class HomeController extends View{

    public function actionIndex(){
        $js  = ['modulos/home/init'];
        $css = ['home/init','preload','nav/firstNav'];
        $views = ['preload/index', 'nav/firstNav' ,'home/index'];

        $seo = new stdClass();
        $seo->description   = 'Barkanas, o melhor espetinho da cidade';
        $seo->title         = 'Barkanas';

        $this->layoutBuilder($views, $js, $css, $seo);
    }

    public function actionMenu(){
        $js  = ['modulos/menu/init' , 'controllers/Products/ProductsController'];
        $css = ['menu/init','preload','nav/firstNav'];
        $views = ['preload/index', 'nav/firstNav' ,'menu/init'];

        $seo = new stdClass();
        $seo->description   = 'Barkanas, o melhor espetinho da cidade';
        $seo->title         = 'Barkanas';

        $this->layoutBuilder($views, $js, $css, $seo);
    }



}