<?php
require_once"accesoDatos.php";
class productos
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_producto;
	public $descripcion;
 	public $precio;
  
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function Getid_oferta()
	{
		return $this->id_producto;
	}
	public function Getdescripcion()
	{
		return $this->descripcion;
	}
	public function Getprecio()
	{
		return $this->precio;
	}

	public function Setid_oferta($valor)
	{
		$this->id_producto = $valor;
	}
	public function Setdescripcion($valor)
	{
		$this->descripcion = $valor;
	}
	public function Setprecio($valor)
	{
		$this->precio = $valor;
	}
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct()
	{
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnproducto($Parametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from productos where id_producto =:id_producto");
		$consulta->bindValue(':id_producto', $Parametro, PDO::PARAM_INT);
		$consulta->execute();
		$VotoBuscado= $consulta->fetchObject('productos');
		return $VotoBuscado;	
					
	}
	
	public static function TraerTodosLosproductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from productos");
		$consulta->execute();			
		$arrVotos= $consulta->fetchAll(PDO::FETCH_CLASS, "productos");	
		return $arrVotos;
	}
	
	public static function Borrarproducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from productos WHERE id_producto=:id_producto");	
		$consulta->bindValue(':id_producto',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	public static function Modificarproducto($productos)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update productos 
				set
				precio=:precio,	
				descripcion=:descripcion
				WHERE id_producto=:id_producto");

			$consulta->bindValue(':id_producto',$productos->id_producto, PDO::PARAM_INT);
			$consulta->bindValue(':precio', $productos->precio, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion', $productos->descripcion, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertarproducto($productos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into productos (precio,descripcion)values(:precio,:descripcion)");
		$consulta->bindValue(':precio', $productos->precio, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion', $productos->descripcion, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
				
	}	
//--------------------------------------------------------------------------------//


}
