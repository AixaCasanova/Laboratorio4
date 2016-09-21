/*Al comenzar el juego generaremos un número 
RANDOM del 1 al 3 para la selección de la máquina, 
siendo 1 para “piedra”, el 2 para “papel” y 3 para “tijera”.
El jugador seleccionará una imagen correspondiente 
a su opción  y le informaremos si ganó, empató o perdió.
*/
var app = angular.module("ppt", []);

app.controller("Control", function($scope){

$scope.eleccionMaquina=Math.floor(Math.random() * (4 - 1)) + 1;
$scope.result="";
 

$scope.comenzar=function()
{
$scope.eleccionMaquina=Math.floor(Math.random() * (4 - 1)) + 1;
$scope.result="";
}

$scope.piedra=function()
{

	if ($scope.eleccionMaquina==1) {
		$scope.result="Empate era piedra";

	}
	 if ($scope.eleccionMaquina==2) {
		$scope.result="Perdiste yo era papel";
	}
	 if ($scope.eleccionMaquina==3) {
		$scope.result="Ganaste yo era tijera";
	}  

}

$scope.papel=function()
{
	if ($scope.eleccionMaquina==1) {
	$scope.result="Ganaste yo era piedra";
	}
	 if ($scope.eleccionMaquina==2) {
		$scope.result="Empate yo era papel";
	}
	 if ($scope.eleccionMaquina==3) {
		$scope.result="Perdiste yo era tijera";
	}  

}

$scope.tijera=function()
{
	if ($scope.eleccionMaquina==1) {
	$scope.result="Perdiste yo era piedra";
	}
	 if ($scope.eleccionMaquina==2) {
		$scope.result="Ganaste yo era papel";
	}
	 if ($scope.eleccionMaquina==3) {
		$scope.result="Empate yo era tijera";
	}  

}
 
 



})