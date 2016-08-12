<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
    header('Content-type: application/json');
	//$files = array_map('basename', glob("./data/*.{txt}", GLOB_BRACE));
  //echo json_encode($files);

$path = 'projects';

$directory = new RecursiveDirectoryIterator($path,RecursiveDirectoryIterator::SKIP_DOTS);
$iterator = new RecursiveIteratorIterator($directory,RecursiveIteratorIterator::LEAVES_ONLY);

$extensions = array("project.json");

foreach ($iterator as $fileinfo) {
    if (in_array($fileinfo->getFilename(), $extensions)) {
        $activedirs[] = $fileinfo->getPath();
    }
}
//echo '<pre>';
//print_r($activedirs);
//echo '</pre>';


foreach ($activedirs as $dir) {
    $string = file_get_contents($dir."/project.json");
    $json_a = json_decode($string, true);
    $json_a['dir'] = $dir;
    $json_a["files"] = array_map('basename', glob($dir."/*.{pdf,jpg,png}", GLOB_BRACE));;
   // echo $json_a['id']." ".$json_a['title'];
    $jsons[] = $json_a;
}

echo json_encode($jsons);

?>