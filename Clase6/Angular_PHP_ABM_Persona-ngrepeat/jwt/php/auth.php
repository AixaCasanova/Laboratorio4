<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$datosDelModeloPorPost= file_get_contents("PHP://input");
$user=json_decode($datosDelModeloPorPost);

//if ($user->mail == "pepe@mail.com" && $user->pass =="4321") {


	$claveDeEncripcion="estaEsLaClave";
	$token["usuario"]="unUsuario";
	$token["perfil"]="admin";
	$token["iat"]=time();
	$token["exp"]=time()+20;

	$jwt = JWT::encode($token, $claveDeEncripcion);
	$array["MitokenGeneradoEnPhp"]=$jwt;
// }else{$jwt=false;}
// $array["MitokenGeneradoEnPhp"]=false;
// $arrayConToken["MitokenGeneradoEnPhp"]=$jwt;
echo json_encode($array);

?>