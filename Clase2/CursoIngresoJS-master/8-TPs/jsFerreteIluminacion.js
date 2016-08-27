/*4.	Para el departamento de iluminación:
Tomando en cuenta que todas las lámparas están en oferta al mismo precio de $35 pesos final.
A.	Si compra 6 o más  lamparitas bajo consumo tiene un descuento del 50%. 
B.	Si compra 5  lamparitas bajo consumo marca "ArgentinaLuz" se hace un descuento del 40 % y si es de otra marca el descuento es del 30%.
C.	Si compra 4  lamparitas bajo consumo marca "ArgentinaLuz" o “FelipeLamparas” se hace un descuento del 25 % y si es de otra marca el descuento es del 20%.
D.	Si compra 3  lamparitas bajo consumo marca "ArgentinaLuz"  el descuento es del 15%, si es  “FelipeLamparas” se hace un descuento del 10 % y si es de otra marca un 5%.
E.	Si el importe final con descuento suma más de $120  se debe sumar un 10% de ingresos brutos en informar del impuesto con el siguiente mensaje:
 ”Usted pago X de IIBB.”, siendo X el impuesto que se pagó. 


function CalcularPrecio () 
{
 	
}
 */


 var app = angular.module("FerreteIluminacion", []);
app.controller("Control2", function($scope){

$scope.cant="0";
$scope.precio="0";
$scope.marca="ArgentinaLuz";
$scope.descuento="0";

$scope.CalcularPrecio=function()
{
	$scope.precio=35;
	if ($scope.cant >= 6) 
	{
		$scope.precio= 35 - (35 * 0.5);	
		$scope.descuento=0.5;
	}
	if ($scope.cant == 5) 
	{
	 
		if ($scope.marca == "ArgentinaLuz") 
		{
			$scope.precio= 35 - (35 * 0.4);
			$scope.descuento=0.4;

		}else{
			$scope.precio = 35 - (35 * 0.3);
			$scope.descuento=0.3;
			 }

	
	}
	if ($scope.cant == 4) 
	{
	 
		if ($scope.marca == "ArgentinaLuz" || $scope.marca == "FelipeLamparas") 
		{
			$scope.precio= 35 - (35 * 0.25);
			$scope.descuento=0.25;
		}else{$scope.precio= 35 - (35 * 0.2); 
			$scope.descuento=0.2;}
	}
	if ($scope.cant == 3) 
	{
	 
		if ($scope.marca == "ArgentinaLuz") 
		{
			$scope.precio= 35 - (35 * 0.15);
			$scope.descuento=0.15;
		}else if($scope.marca == "“FelipeLamparas”"){$scope.precio= 35 - (35 * 0.1);}
		else{$scope.precio= 35 - (35 * 0.05);
		$scope.descuento=0.05; }
	}

		$scope.result=$scope.precio * $scope.cant;
		if ($scope.result > 120) {
			$scope.result = $scope.result*1.2 
			$scope.result2= "”Usted pago "+($scope.result-($scope.result*0.2))+" de IIBB.”, siendo "+($scope.result*0.2).	toFixed(2)+" el impuesto que se pagó.";
		}else{$scope.result2="";}


}



})