<?php
require_once"accesoDatos.php";
class Votos
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $dni;
	public $sexo;
 	public $fecha;
  	public $foto;
  	public $partido;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function Getdni()
	{
		return $this->dni;
	}
	public function Getpartido()
	{
		return $this->partido;
	}
	public function Getfecha()
	{
		return $this->fecha;
	}
	public function Getsexo()
	{
		return $this->sexo;
	}

	public function GetFoto()
	{
		return $this->foto;
	}

	public function Setdni($valor)
	{
		$this->dni = $valor;
	}
	public function Setpartido($valor)
	{
		$this->partido = $valor;
	}
	public function Setfecha($valor)
	{
		$this->fecha = $valor;
	}
	public function Setsexo($valor)
	{
		$this->sexo = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Votos::TraerUnaVoto($dni);
			$this->dni = $dni;
			$this->fecha= $obj->fecha;
			$this->sexo = $obj->sexo;
			$this->foto = $obj->foto;
			$this->partido = $obj->partido;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->fecha."-".$this->sexo."-".$this->dni."-".$this->foto-"-".$this->partido;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaVoto($Parametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Votos where dni =:dni");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:dni)");
		$consulta->bindValue(':dni', $Parametro, PDO::PARAM_INT);
		$consulta->execute();
		$VotoBuscado= $consulta->fetchObject('Votos');
		return $VotoBuscado;	
					
	}
	
	public static function TraerTodosLosVotos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Votos");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrVotos= $consulta->fetchAll(PDO::FETCH_CLASS, "Votos");	
		return $arrVotos;
	}
	
	public static function BorrarVoto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from Votos WHERE dni=:dni");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:dni)");	
		$consulta->bindValue(':dni',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarVoto($Votos)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update Votos 
				set sexo=:sexo,
				fecha=:fecha,
				foto=:foto,
				partido=:partido,
				WHERE dni=:dni");
			//$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:dni,:sexo,:apellido,:foto)");
			$consulta->bindValue(':dni',$Votos->dni, PDO::PARAM_INT);
			$consulta->bindValue(':sexo',$Votos->sexo, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $Votos->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':partido', $Votos->partido, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $Votos->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarVoto($Votos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Votos (dni,sexo,fecha,partido,foto)values(:dni,:sexo,:fecha,:partido,:foto)");
		$consulta->bindValue(':sexo',$Votos->sexo, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $Votos->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $Votos->dni, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $Votos->foto, PDO::PARAM_STR);
		$consulta->bindValue(':partido', $Votos->partido, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
				
	}	
//--------------------------------------------------------------------------------//


}
