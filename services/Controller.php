<?php

/**
 * Class Controller
 * @package services
 */

class Controller {
    /**
     * Função exebição
     * @param $view
     */
    public function renderView($view) {
        require_once "../mvc/views/{$view}.php";
    }


    /**
     * Função controlador de redirecionamento
     * @param $class
     */
    public function redirectController($class) {
        header('Location: '.Host::getLocal().$class);
    }

    /**
     * Função redirecionar controlador
     * @param $class
     * @param $action
     */
    public function redirectControllerAction($class,$action) {
        header('Location: '.Host::getLocal().$class."/".$action);
    }


}