<?php 
    class SpreadWords {
        
        public static function turnIntoOptimizedLink($actionName) {
            
            $word = lcfirst($actionName);
            $word = str_split($word);

            $onlyCapitalLetter = array_map(function($letter) {
                if(ctype_upper($letter)) {
                    return '-'.strtolower($letter);
                }

                return $letter;	

            },$word);

            $onlyCapitalLetter = implode('', $onlyCapitalLetter);	
            return $onlyCapitalLetter;
        }

        public static function joinLettersToCallAction($actionName) {
            return str_replace('-','',$actionName);
        }
    }
?>