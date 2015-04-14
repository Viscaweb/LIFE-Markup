<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);


file_put_contents('../compiled/index.html', $twig->render('index.html.twig'));
file_put_contents('../compiled/index-login-button.html', $twig->render('index-login-button.html.twig'));

file_put_contents('../compiled/match-head-to-head.html', $twig->render('match-head-to-head.html.twig'));
file_put_contents('../compiled/match-summary.html', $twig->render('match-summary.html.twig'));
file_put_contents('../compiled/match-summary-match-tips-iframe.html', $twig->render('match-summary-match-tips-iframe.html.twig'));
file_put_contents('../compiled/match-summary-live-commentary-iframe.html', $twig->render('match-summary-live-commentary-iframe.html.twig'));
file_put_contents('../compiled/match-odds.html', $twig->render('match-odds.html.twig'));

file_put_contents('../compiled/league-summary.html', $twig->render('league-summary.html.twig'));
file_put_contents('../compiled/player-summary.html', $twig->render('player-summary.html.twig'));
file_put_contents('../compiled/team-squad.html', $twig->render('team-squad.html.twig'));
file_put_contents('../compiled/team-summary.html', $twig->render('team-summary.html.twig'));

file_put_contents('../compiled/other-sports.html', $twig->render('other-sports.html.twig'));
file_put_contents('../compiled/base-tables.html', $twig->render('base-tables.html.twig'));
file_put_contents('../compiled/custom-blocks.html', $twig->render('custom-blocks.html.twig'));
file_put_contents('../compiled/all-listings.html', $twig->render('all-listings.html.twig'));
file_put_contents('../compiled/streaming.html', $twig->render('streaming.html.twig'));


file_put_contents('../compiled/user-dashboard-contest.html', $twig->render('user-dashboard-contest.html.twig'));
file_put_contents('../compiled/user-my-information.html', $twig->render('user-my-information.html.twig'));
file_put_contents('../compiled/user-profile.html', $twig->render('user-profile.html.twig'));
file_put_contents('../compiled/user-popups.html', $twig->render('user-popups.html.twig'));
file_put_contents('../compiled/empty-blocks.html', $twig->render('empty-blocks.html.twig'));
file_put_contents('../compiled/example-datepicker.html', $twig->render('example-datepicker.html.twig'));
file_put_contents('../compiled/login.html', $twig->render('login.html.twig'));
file_put_contents('../compiled/login-pass-recovery.html', $twig->render('login-pass-recovery.html.twig'));

file_put_contents('../compiled/webmaster-2.html', $twig->render('webmaster-2.html.twig'));
file_put_contents('../compiled/webmaster-widgets.html', $twig->render('webmaster-widgets.html.twig'));
file_put_contents('../compiled/webmaster-widget-maker.html', $twig->render('webmaster-widget-maker.html.twig'));
file_put_contents('../compiled/webmaster-widget-maker-iframe.html', $twig->render('webmaster-widget-maker-iframe.html.twig'));

file_put_contents('../compiled/news.html', $twig->render('news.html.twig'));
file_put_contents('../compiled/article-elements.html', $twig->render('article-elements.html.twig'));

file_put_contents('../compiled/sitemap.html', $twig->render('sitemap.html.twig'));
file_put_contents('../compiled/contact.html', $twig->render('contact.html.twig'));
file_put_contents('../compiled/content-page.html', $twig->render('content-page.html.twig'));

file_put_contents('../compiled/all-bootstrap-components.html', $twig->render('all-bootstrap-components.html.twig'));

?>