
<?php 
if(isset($_POST['name']))
{
	$filename = $_POST['name'].".html";
	$content = $_POST['content'];
	//echo "content = ".$content;
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/last/files/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/last/files/".$filename;
// Ouvre un fichier pour lire un contenu existant
	$current = file_get_contents($file);
// Ajoute une personne
$current .= $content;
//echo "current = ".$current;
// Écrit le résultat dans le fichier
file_put_contents($file, $current);

	}else{
		$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/last/files/".$filename,"w+");
		fwrite($fp,$content);
	fclose($fp);
	}
	
    // Do whatever you want with the $uid
}

/*$content = "some text here";
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/plenty_of_room/files/myText.txt","wb");
fwrite($fp,$content);
fclose($fp);*/
?>
