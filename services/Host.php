<?php  
    class Host
    {
        const HOME = "home";
        const PWA  = "https://pwa.taxireturn.com.br/";

        public static function getLocal()
        {
            return env("host");

        }


    }