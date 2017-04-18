
<?php 
if(isset($_GET['name']))
{
	$filename = $_GET['name'].".html";
	//echo "content = ".$content;
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/files/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/files/".$filename;
// Ouvre un fichier pour lire un contenu existant
	$current = file_get_contents($file);

echo $current;
	}else{
		$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/files/".$filename,"w+");
	fclose($fp);
	}
	
    // Do whatever you want with the $uid
}

/*$content = "some text here";
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/files/myText.txt","wb");
fwrite($fp,$content);
fclose($fp);*/
?>
