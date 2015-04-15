<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);

/* Generating static html files */

echo "<pre>Generating HTML files :\n";
if ($templateDir = opendir('views/pages/')) {
    $i = 0;
    while (false !== ($twigTemplate = readdir($templateDir))) {

        if( strpos($twigTemplate, '.html.twig') !=false) {
            $i++;

            $twigTemplatePath = 'pages/'.$twigTemplate;

            $htmlFile = strstr($twigTemplate,'.twig', true );
            echo $i.' - <a href="../compiled/'.$htmlFile.'"">';
            echo generateHtml($htmlFile , $twigTemplatePath, $twig);
            echo "</a>\n";
            }
    }
    closedir($templateDir);

}
echo "</pre>";


function generateHtml($outputFile, $twigTemplate, $twig) {
    $outputPath = '../compiled/'.$outputFile;
    file_put_contents($outputPath, $twig->render($twigTemplate));
    return $outputFile;
}


?>