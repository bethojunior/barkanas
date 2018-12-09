<?php
/**
* Created by PhpStorm.
* User: Emerson
* Date: 08/04/2018
* Time: 07:42
*/

class View extends Controller
{

   public $clientData = [];
   public $user;
   public $permissions = [];
   public $filesJs;
   public $filesCss; 
   protected $seo = null; 

   /**
    * @param array $views
    * @param array $filesJs
    * @param array $filesCss
    * @param string $description
    * @param bool $infoClient
    */
   public function layoutBuilder($views = [],$filesJs = [],$filesCss = [], $seoObj = null)
   {
       $this->filesJs = $filesJs;
       $this->filesCss = $filesCss;
       $this->titlePage = ($seoObj->title != null) ? $seoObj->title : "Taxi Return";
        
       if(!is_null($seoObj)) {
        $this->seo = new Seo($seoObj);
       }
       
       $this->renderView("import/head");

    
       foreach ($views as $view) {
           $this->renderView($view);
       }

       $this->renderView("import/jsImport");

   }

}
 