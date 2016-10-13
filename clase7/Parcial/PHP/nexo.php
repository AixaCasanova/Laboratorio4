<?php 

include "clases/Personas.php";
include "clases/Login.php";
include "clases/Votos.php";
// $_GET['accion'];
if ( !empty( $_FILES ) ) 
{
    $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
    $ruta = "..". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $temporal, $ruta );
    echo "correcto";
}
if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}
	elseif ($accion=="vervotos") {
		$respuesta=array();
		$respuesta['votos']= Votos::TraerTodosLosVotos();
		echo json_encode($respuesta);
	}
	elseif ($accion=="traerU") {
		$respuesta= array();
		$respuesta['listado']=Login::TraerTodosLosLogins();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}


	

}
else{

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	switch($respuesta->datos->accion)
	{
		case "borrar":
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->persona->foto);
			}
			Persona::BorrarPersona($respuesta->datos->persona->id);
			break;
		}
		case "insertar":
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
			}
			Persona::InsertarPersona($respuesta->datos->persona);
			break;
		}
		case "buscar":
		{
			echo json_encode(Persona::TraerUnaPersona($respuesta->datos->id));
			break;
		}
		case "loguear":
		{

			//echo json_encode($respuesta->datos);
			echo json_encode(Login::TraerUnLogin($respuesta->datos->mail));
			
			break;
		}
		case "modificar":
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
			}
			Persona::ModificarPersona($respuesta->datos->persona);
			break;
		}
		case "AltaVoto":
		{
			$UnVoto = new Votos();
			$UnVoto->dni=$respuesta->datos->voto->dni;
			$UnVoto->fecha=$respuesta->datos->voto->fvot;
			$UnVoto->partido=$respuesta->datos->voto->partido;
			$UnVoto->sexo=$respuesta->datos->voto->s;
			if (isset($respuesta->datos->voto->foto)) {
				$UnVoto->foto=$respuesta->datos->voto->dni.".".PATHINFO($respuesta->datos->voto->foto, PATHINFO_EXTENSION);
			}else{$UnVoto->foto="sinfoto.jpg";}
			Votos::InsertarVoto($UnVoto);
			 echo json_encode($respuesta->datos->voto->dni);
			 break;
		}
		case "BorrarV":
		{
			if($respuesta->datos->voto->foto!="sinfoto.jpg")
			{
				unlink("../fotos/vot/".$respuesta->datos->voto->foto);
			}
			$result=Votos::BorrarVoto($respuesta->datos->voto->dni);
			echo json_encode($result);
			break;
		}
		case "BorrarU":
		{
			if($respuesta->datos->persona->foto!="sinfoto.png")
			{
				unlink("../fotos/uss/".$respuesta->datos->persona->foto);
			}
			Login::BorrarLogin($respuesta->datos->persona->Mail);
			break;
		}
		case "modificarV":
		{
			if($respuesta->datos->voto->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/vot/".$respuesta->datos->voto->foto;
				$rutaNueva=$respuesta->datos->voto->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				//copy($rutaVieja, "../fotos/vot/".$rutaNueva);
				if($respuesta->datos->voto->foto!="sinfoto.jpg")
			{
				unlink($rutaVieja);
			}
				
				$respuesta->datos->voto->foto=$rutaNueva;
			}
			//$result=Votos::BorrarVoto($respuesta->datos->voto->dni);
			votos::ModificarVoto($respuesta->datos->voto);

			break;
		}
		case "AltaUsu":
		{
			$UnUs = new Login();
			$UnUs->mail=$respuesta->datos->usuario->mail;
			$UnUs->pass=$respuesta->datos->usuario->pass;
			$UnUs->tipo=$respuesta->datos->usuario->tipo;
			$UnUs->foto=$respuesta->datos->usuario->foto;
			if (isset($respuesta->datos->usuario->foto)) {
				$UnUs->foto=$respuesta->datos->usuario->foto;
			}else{$UnUs->foto="sinfoto.jpg";}
			Login::InsertarLogin($UnUs);
			echo json_encode($UnUs->mail);
			break;
		 
		}
		 
		case "upIMGR":
		{	 
			if (isset($respuesta->datos->usuario->foto)) {
				$rutaVieja="../fotos/".$respuesta->datos->usuario->foto;
				$rutaNueva="../fotos/uss/".$respuesta->datos->usuario->foto;
				if (file_exists($rutaVieja)) {
					copy($rutaVieja, $rutaNueva);
					unlink($rutaVieja);
				}
				
			}
			 echo json_encode($rutaNueva);
			 break;
			 
		}
			case "upIMG":
		{	 
			if (isset($respuesta->datos->voto->foto)) {
				$rutaVieja="../fotos/".$respuesta->datos->voto->foto;
				$rutaNueva=$respuesta->datos->voto->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				if (file_exists($rutaVieja)) {
					copy($rutaVieja, "../fotos/vot/".$rutaNueva);
					unlink($rutaVieja);
				}
				
			}
			break;
			 
		}	
	}


}




 ?>