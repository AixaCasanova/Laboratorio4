/*Al comenzar el juego generamos un número 
secreto del 1 al 100, en la pantalla del juego
 dispondremos de un cuadro de texto para ingresar
  un número y un botón “Verificar”, si el número 
  ingresado es el mismo que el número secreto se dará 
  por terminado el juego con un mensaje similar a este: 
“Usted es un ganador!!! y en solo X intentos”.
de no ser igual se debe informar si “falta…”  para llegar al número secreto  o si “se pasó…”  del número secreto.

var numeroSecreto; 
var contadorIntentos;

function comenzar()
{
	//Genero el número RANDOM entre 1 y 100
	 
		//alert(numeroSecreto );
	

}

function verificar()
{
	
	
}*/



 var app = angular.module("AdivinaElNumero", []);
app.controller("Control", function($scope){

$scope.num="0";
$scope.intentos=0;
$scope.NSecreto="";
$scope.result="";
$scope.Falta="";
 
	$scope.verificar=function()
	{
		$scope.intentos=$scope.intentos+1;
		if ($scope.num == $scope.NSecreto)
		{
			$scope.result="Usted es un ganador!!! y nro de intentos: "+$scope.intentos;

		}else{
			if ($scope.NSecreto>$scope.num) 
			{
				$scope.Falta=$scope.NSecreto - $scope.num; 
				$scope.result="Numero incorrecto, Falta "+ $scope.Falta;
			}else{
				$scope.Falta=$scope.num - $scope.NSecreto;
				$scope.result="Numero incorrecto, Sobra "+ $scope.Falta;
			} 
			
		}
	}
	$scope.comenzar=function()
	{
		$scope.NSecreto= Math.round(Math.random()*100);
		$scope.result="Numero secreto generado, Comienza!";
	
	}



})