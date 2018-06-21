<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('../src/views');

$twig = new Twig_Environment($loader);

$twigTemplate = 'pages/'.$_GET["p"];

echo $twig->render($twigTemplate);


?>