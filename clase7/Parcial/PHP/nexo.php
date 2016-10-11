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
			 
		}
	}


}




 ?>