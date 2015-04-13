<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);


file_put_contents('../compiled/index-twig.html', $twig->render('index.html.twig'));
file_put_contents('../compiled/league-summary-twig.html', $twig->render('league-summary.html.twig'));

?>