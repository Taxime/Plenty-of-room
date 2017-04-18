<?php
//////////////////////////////////////////////////////////
function is_image($path)
{
	$a = getimagesize($path);
	$image_type = $a[2];

	if(in_array($image_type , array(IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG , IMAGETYPE_BMP)))
	{
		return true;
	}
	return false;
}
function includes($path,$string)
{
	if (strpos($path, $string) !== false) {
		return true;
	}
	return false;
}
function listFolderFiles($dir){
	$ffs = scandir($dir);
	foreach($ffs as $ff){
		if($ff != '.' && $ff != '..'){
			
			if(is_dir($dir.'/'.$ff)){
				echo "<dir><name>".$ff."</name><content>";
				listFolderFiles($dir.$ff.'/');
				echo "</content><path>".$dir.$ff."</path></dir>";
			} 
			if(is_image($dir.'/'.$ff)){
				echo "<file><name>".$ff."</name><content></content><path>".$dir.$ff."</path><type>image</type></file>";
			}
			if(includes($dir.'/'.$ff,".html")){
				$current = file_get_contents($dir.'/'.$ff);

				echo "<file><name>".$ff."</name><content>".$current."</content><path>".$dir.$ff."</path><type>text</type></file>";
			}
			
		}
	}
}
/////////////////////////////////////////////////////////
if(isset($_GET['dir']))
{
	// /dir/ 
	$dir = $_SERVER['DOCUMENT_ROOT'].$_GET['dir'];
	echo $dir;
	listFolderFiles($dir);
}


if(isset($_POST['file_name']) && isset($_POST['content']))
{
	$filename = $_POST['file_name'].".html";
	$content = $_POST['content'];
	echo "content = ".$content;
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/data/".$filename;
		$current = file_get_contents($file);
		$current .= $content;
		file_put_contents($file, $current);

	}else{
		$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename,"w+");
		fwrite($fp,$content);
		fclose($fp);
	}
	

}

if(isset($_POST['file_name']) && isset($_POST['content_to_replace']))
{
	$filename = $_POST['file_name'].".html";
	$content = $_POST['content_to_replace'];
	echo "content = ".$content;
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/data/".$filename;
		$current = file_get_contents($file);
		file_put_contents($file, str_replace($current,$content,file_get_contents($file)));

	}else{
		$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename,"w+");
		fwrite($fp,$content);
		fclose($fp);
	}
	

}

if(isset($_POST['file_name_to_erase']))
{
	$filename = $_POST['file_name_to_erase'].".html";
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/data/".$filename;
		echo $file;
		file_put_contents($file, '');

	}else{
		echo "file ".$filename." not found";
	}
	

}

if(isset($_GET['file_name_to_check']))
{
	$filename = $_GET['file_name_to_check'].".html";
	
	if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/data/".$filename)) {
		$file = $_SERVER['DOCUMENT_ROOT'] . "/data/".$filename;
		$current = file_get_contents($file);
		echo $current;

	}else{
		echo "file ".$filename." not found";
	}
}





?>

