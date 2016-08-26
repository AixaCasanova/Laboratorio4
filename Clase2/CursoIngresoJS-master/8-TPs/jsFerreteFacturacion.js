/*1.	Para el departamento de facturación:
A.	Ingresar tres precios de productos y mostrar la suma de los mismos.
B.	Ingresar tres precios de productos y mostrar el promedio de los mismos.
C.	ingresar tres precios de productos  y mostrar precio final (más IVA 21%).
 
function Sumar () 
{
	
}
function Promedio () 
{
	
}
function PrecioFinal () 
{
	
}*/

var app = angular.module("FerreteFacturacion", []);

//ejercicio 1 ---------------------------------------

app.controller("Control", function($scope){
$scope.p1="1";
$scope.p2="2";
$scope.p3="3";

$scope.Sumar=function(){
$scope.result = Number($scope.p1) + Number($scope.p2) + Number($scope.p3); 	
}

$scope.Promedio=function(){
$scope.result = (Number($scope.p1) + Number($scope.p2) + Number($scope.p3))/3; 	
}

$scope.PrecioFinal=function(){
$scope.result = Number($scope.p1) + Number($scope.p2) + Number($scope.p3) + ((Number($scope.p1) + Number($scope.p2) + Number($scope.p3))*0.21); 	
}
//---------------------------------------------------




 
