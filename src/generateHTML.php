<?php

require '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);

/* Generating static html files */

echo '<pre>';

echo "Generating HTML files :\n";
    compileFolder('pages/', '../compiled/', $twig);
echo "Generating Pattern Library HTML files :\n";
    compileFolder('pages/patterns-library/', '../compiled/patterns-library/', $twig);
echo "Generating Livescore Pages HTML files :\n";
compileFolder('pages/livescore-pages/', '../compiled/livescore-pages/', $twig);

echo '</pre>';

function generateHtml($outputPath, $outputFile, $twigTemplate, $twig) {
    $filePath = $outputPath.$outputFile;
    file_put_contents($filePath, $twig->render($twigTemplate));
    return $outputFile;
}

function compileFolder($sourceDir, $targetDir, $twig) {

    $sourceDirFull = 'views/'.$sourceDir;

    if ($templateDir = opendir($sourceDirFull)) {
        $i = 0;
        while (false !== ($twigTemplate = readdir($templateDir))) {

            if( strpos($twigTemplate, '.html.twig') !=false) {
                $i++;

                $twigTemplatePath = $sourceDir.$twigTemplate;
                $outputPath = $targetDir;

                $htmlFile = strstr($twigTemplate,'.twig', true );
                echo $i.' - <a href="'.$outputPath.$htmlFile.'">';
                echo generateHtml($outputPath, $htmlFile , $twigTemplatePath, $twig);
                echo "</a>\n";
            }
        }
        closedir($templateDir);

    }
}


?>