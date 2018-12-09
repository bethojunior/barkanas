<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="theme-color" content="#E18600"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="<?= Host::getLocal(); ?>/webfiles/img/logo.png">
    <link href="<?=Host::getLocal()?>/webfiles/css/vendor/materialize.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="<?= Host::getLocal(); ?>webfiles/css/dosis.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- import dynamic css in each page  -->
    <?php
    if (isset($this->filesCss)) : ?>
        <?php foreach ($this->filesCss as $css) : ?>
            <link rel="stylesheet" href="<?php echo Host::getLocal(); ?>webfiles/css/<?php echo $css ?>.css">
        <?php endforeach; ?>
    <?php endif; ?>

    <?php if ($this->seo != null) : ?>
        <title><?= $this->seo->getTitle(); ?></title>
        <meta property="og:title" content="<?= $this->seo->getTitle(); ?>">
        <meta property="og:description" content="<?= $this->seo->getDescription(); ?>">
        <meta content="<?= $this->seo->getDescription(); ?>" name="description">
    <?php endif; ?>
    <link rel="stylesheet" href="<?php echo Host::getLocal()?>webfiles/css/autocomplete.css">

    <meta property="og:image" content="<?= Host::getLocal(); ?>webfiles/img/logo.jpg">
    <script src="<?=Host::getLocal();?>/webfiles/js/libs/jquery.js"></script>
    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1097542713733927');
        fbq('track', 'PageView');
    </script>

    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=1097542713733927&ev=PageView&noscript=1
https://www.facebook.com/tr?id=1097542713733927&ev=PageView&noscript=1
"
        /></noscript>
    <!-- End Facebook Pixel Code -->

</head>
<body>