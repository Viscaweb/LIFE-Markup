<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);

/* Generating static html files */

echo "<pre>Generating HTML files :\n";
if ($templateDir = opendir('views')) {
    $i = 0;
    while (false !== ($twigTemplate = readdir($templateDir))) {

        if( strpos($twigTemplate, '.html.twig') !=false) {
            $i++;

            $htmlFile = strstr($twigTemplate,'.twig', true );
            echo $i.' - ';
            echo generateHtml($htmlFile , $twigTemplate, $twig);
            echo "\n";
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