<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);


file_put_contents('../compiled/index-twig.html', $twig->render('index.html.twig'));
file_put_contents('../compiled/league-summary-twig.html', $twig->render('league-summary.html.twig'));
file_put_contents('../compiled/match-head-to-head-twig.html', $twig->render('match-head-to-head.html.twig'));
file_put_contents('../compiled/match-summary-twig.html', $twig->render('match-summary.html.twig'));
file_put_contents('../compiled/match-summary-match-tips-iframe-twig.html', $twig->render('match-summary-match-tips-iframe.html.twig'));
file_put_contents('../compiled/match-summary-live-commentary-iframe-twig.html', $twig->render('match-summary-live-commentary-iframe.html.twig'));

?>