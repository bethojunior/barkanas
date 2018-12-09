<?php 
    class Seo {
        private $description;
        private $ogImage;
        private $title;
        
        function __construct($object) {
            $this->description   = $object->description   ?? null;
            $this->ogImage       = $object->ogImage       ?? null;
            $this->title         = $object->title         ?? null; 
        }

        public function getDescription() {
            return $this->description;
        }
        
        public function getOgImage() {
            return $this->ogImage;
        }

        
        public function getOgDescription() {
            return $this->ogDescription;
        }

        
        public function getOgTitle() {
            return $this->ogTitle;
        }

        
        public function getTitle() {
            return $this->title;
        }

        public function setDescription($description) {
            $this->description = $description;
        }
        
        public function setOgImage($ogImage) {
            $this->ogImage = $ogImage;
        }

        
        public function setOgDescription($ogDescription) {
            $this->ogDescription = $ogDescription;
        }

        
        public function setOgTitle($ogTitle) {
            $this->ogTitle = $ogTitle;
        }

        
        public function setTitle($title) {
            $this->title = $title;
        }
    }
?>