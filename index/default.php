<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('session.gc_probality', 0);
setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set('America/Fortaleza');

session_start();
startIncludes('../services');
startIncludes('../mvc/controllers');
startIncludes('../mvc/dao');
startIncludes('../mvc/model');

$params = [];

if(!isset($_GET['url'])){
    header("Location: /taxireturn/");
}

if (isset($_GET['url'])) {
    $params = explode('/', $_GET['url']);
}

$class = "Home";
$action = 'actionIndex';

if (isset($params[0])) {
    $class = $params[0] === "index.php" ? "home" : $params[0];
}

if (isset($params[1])) {
    $action = "action" . $params[1];
}

$classController = $class . 'Controller';


if (!class_exists($classController)) {
    Controller::renderView("404");
    return;
}

$obj = new $classController();

$action = SpreadWords::joinLettersToCallAction($action);

if (!method_exists($obj, $action)) {
    Controller::renderView("404");
    return;
}

$obj->$action();

function startIncludes($path)
{
    foreach (scandir($path) as $filename) {
        $file = $path . '/' . $filename;
        $extension = explode('.', $file);
        if (is_file($file) && end($extension) == "php") {
            require $file;
        }
    }
}