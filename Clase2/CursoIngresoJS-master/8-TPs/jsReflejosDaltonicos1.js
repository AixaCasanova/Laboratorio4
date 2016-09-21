/*En la pantalla se mostrarán 6 botones de 
distintos colores,  al comenzar el juego se 
mostrara el texto de un color entre los 6 posibles
 para que el jugador sepa que botón tocar .Al tocar 
 el botón correcto se informara cuanto tiempo tardo.
*/

 var app = angular.module("rd", []);
app.controller("Control", function($scope){

$scope.ColorSecreto="";
$scope.tiempoInicio="";
$scope.tiempoTOTAL="";
$scope.res="";
$scope.d = new Date();
	$scope.Responder=function($color)
	{
		 if ($color == $scope.ColorSecreto) {
			$scope.dAc = new Date();
			$scope.tiempoTOTAL=$scope.dAc.getMinutes() - $scope.tiempoInicio;
			 $scope.res="Gano!"
		}else{$scope.res="sigue intentando!"}
		
	}


	$scope.comenzar=function()
	{ 
		$scope.tiempoTOTAL="";
		$scope.res="";
		$scope.lista=[];
		$scope.lista[0]="azul";
		$scope.lista[1]="amarillo";
		$scope.lista[2]="marron";
		$scope.lista[3]="verde";
		$scope.lista[4]="celeste";
		$scope.lista[5]="rojo";
		
		$scope.tiempoInicio=$scope.d.getMinutes();

		$scope.ColorSecreto=$scope.lista[Math.floor(Math.random() * (7 - 1)) + 1];
	}



})