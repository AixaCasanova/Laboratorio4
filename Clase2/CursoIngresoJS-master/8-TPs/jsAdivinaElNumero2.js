/*En esta oportunidad el juego evaluará tus
 aptitudes a partir de la cantidad de intentos, 
 por lo cual se informará lo siguiente:
1° intento: “usted es un Psíquico”.
2° intento: “excelente percepción”.
3° intento: “Esto es suerte”.
4° intento: “Excelente técnica”.
5° intento: “usted está en la media”.
Desde  6 Intentos hasta 10:”falta técnica”
Más de 10 intentos: “afortunado en el amor!!”.*/


 var app = angular.module("AdivinaElNumero", []);
app.controller("Control", function($scope){

$scope.num="0";
$scope.intentos=0;
$scope.NSecreto="";
$scope.result="";
$scope.Falta="";
$scope.result2="";
 
	$scope.verificar=function()
	{
		$scope.intentos=$scope.intentos+1;
		if ($scope.num == $scope.NSecreto)
		{
			if($scope.intentos == '1'){$scope.result2="usted es un Psíquico";}
			if($scope.intentos == '2'){$scope.result2="excelente percepción";}
			if($scope.intentos == '3'){$scope.result2="Esto es suerte";}
			if($scope.intentos == '4'){$scope.result2="Excelente técnica";}
			if($scope.intentos == '5'){$scope.result2="usted está en la media";}
			if($scope.intentos >= '6' && $scope.intentos < '10'){$scope.result2="falta técnica";}
			if($scope.intentos > '10') {$scope.result2="afortunado en el amor!";}
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
		$scope.intentos=0;
		$scope.num="0";
		$scope.NSecreto= Math.round(Math.random()*100);
		$scope.result="Numero secreto generado, Comienza!";
	
	}



})