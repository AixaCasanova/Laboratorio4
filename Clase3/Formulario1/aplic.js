var app = angular.module("app", []);
app.controller("Control", function($scope){
	$scope.res="hola";
	$scope.persona=[];
	$scope.persona.nombre="nom";
	$scope.persona.apellido="ap";
	$scope.persona.edad=1;
	$scope.persona.dni=1;
	$scope.persona.mail="mail@mail.com";
	$scope.persona.sexo="";
	$scope.persona.estado="";
	$scope.persona.Fnac="";
	$scope.persona.pass="";
	$scope.persona.passCP="";
	$scope.persona.lenguaje="";

});