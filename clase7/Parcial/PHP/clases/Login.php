<?php
require_once"accesoDatos.php";
class Login
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $mail;
	public $pass;
	public $tipo;
	public $foto;

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
	public function Gettipo()
	{
		return $this->tipo;
	}
	public function Getfoto()
	{
		return $this->foto;
	}
	
	public function Setfoto($valor)
	{
		$this->foto = $valor;
	}
	public function Settipo($valor)
	{
		$this->tipo = $valor;
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
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Login where Mail =:MailP");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnLogin(:MailP)");
		$consulta->bindValue(':MailP', $MailP, PDO::PARAM_INT);
		$consulta->execute();
		$LoginBuscada= $consulta->fetchObject('Login');
		return $LoginBuscada;	
					
	}
	
	public static function TraerTodosLosLogins()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Login");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLosLogins()");
		$consulta->execute();			
		$arrLogins= $consulta->fetchAll(PDO::FETCH_CLASS, "Login");	
		return $arrLogins;
	}
	
	public static function BorrarLogin($MailP)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from login WHERE Mail=:Mail");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarLogin(:Mail)");	
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
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Login (Mail,pass,tipo,foto)values(:Mail,:pass,:tipo,:foto)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLogin (:Mail,:pass,:tipo,:foto");
		$consulta->bindValue(':pass', $Login->pass, PDO::PARAM_STR);
		$consulta->bindValue(':Mail', $Login->mail, PDO::PARAM_STR); 
		$consulta->bindValue(':tipo', $Login->tipo, PDO::PARAM_STR); 
		$consulta->bindValue(':foto', $Login->foto, PDO::PARAM_STR); 
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
