<?php
require_once"accesoDatos.php";
class Login
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $mail;
	public $pass;


//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetMail()
	{
		return $this->id;
	}
	public function Getpass()
	{
		return $this->pass;
	}
	
	public function SetMail($valor)
	{
		$this->Mail = $valor;
	}
	public function Setpass($valor)
	{
		$this->pass = $valor;
	}
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($Mail=NULL)
	{
		if($Mail != NULL){
			$obj = Login::TraerUnLogin($Mail);
			
			$this->pass = $obj->pass;
			$this->Mail = $Mail;
	
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->pass."-".$this->Mail;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnLogin($MailP) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Login where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaLogin(:MailP)");
		$consulta->bindValue(':MailP', $MailP, PDO::PARAM_INT);
		$consulta->execute();
		$LoginBuscada= $consulta->fetchObject('Login');
		return $LoginBuscada;	
					
	}
	
	public static function TraerTodosLosLogins()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Login");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasLogins() ");
		$consulta->execute();			
		$arrLogins= $consulta->fetchAll(PDO::FETCH_CLASS, "Login");	
		return $arrLogins;
	}
	
	public static function BorrarLogin($MailP)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from Login	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarLogin(:Mail)");	
		$consulta->bindValue(':Mail',$MailP, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarLogin($Login)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update Login 
				set nombre=:nombre,
				pass=:pass,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarLogin(:Mail,:pass)");
			$consulta->bindValue(':Mail',$Login->id, PDO::PARAM_INT);
			$consulta->bindValue(':pass', $Login->pass, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarLogin($Login)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Login (nombre,pass,Mail,foto)values(:nombre,:pass,:Mail,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLogin (:Mail,:pass");
		$consulta->bindValue(':pass', $Login->pass, PDO::PARAM_STR);
		$consulta->bindValue(':Mail', $Login->Mail, PDO::PARAM_STR); 
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	// public static function TraerLoginsTest()
	// {
	// 	$arrayDeLogins=array();

	// 	$Login = new stdClass();
	// 	$Login->id = "4";
	// 	$Login->nombre = "rogelio";
	// 	$Login->pass = "agua";
	// 	$Login->Mail = "333333";
	// 	$Login->foto = "333333.jpg";

	// 	//$objetJson = json_encode($Login);
	// 	//echo $objetJson;
	// 	$Login2 = new stdClass();
	// 	$Login2->id = "5";
	// 	$Login2->nombre = "Bañera";
	// 	$Login2->pass = "giratoria";
	// 	$Login2->Mail = "222222";
	// 	$Login2->foto = "222222.jpg";

	// 	$Login3 = new stdClass();
	// 	$Login3->id = "6";
	// 	$Login3->nombre = "Julieta";
	// 	$Login3->pass = "Roberto";
	// 	$Login3->Mail = "888888";
	// 	$Login3->foto = "888888.jpg";

	// 	$arrayDeLogins[]=$Login;
	// 	$arrayDeLogins[]=$Login2;
	// 	$arrayDeLogins[]=$Login3;
		 
		

	// 	return  $arrayDeLogins;
				
	// }	


}
