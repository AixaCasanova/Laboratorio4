var miapp = angular.module("AngularABM", ['ui.router','angularFileUpload']);
miapp.config(function($stateProvider, $urlRouterProvider){

$stateProvider
	.state(
			"inicio",
			{url:"/inicio",
			templateUrl:"inicio.html",
			controller:"controlinicio"}
			)
	.state(
			"persona",{
				url:"/persona",
				abstract:true,
				templateUrl:"abstractaPersona.html"
			})



	// .state(
	// 		"persona.menu",{
	// 			url:"/menu",
	// 			views:{"contenido":{
	// 				templateUrl:"personaMenu.html",
	// 				controller:"controlPersonaMenu"}
					
	// 			}
	// 		})

	.state(
			"persona.alta",{
				url:"/alta",
				views:{"contenido":{
					templateUrl:"personaalta.html",
					controller:"PersonaAlta"}
					
				}
				/*url:"/menu",
				templateUrl:"personaMenu.html"*/
			})
	
	.state(
			"login",
			{url:"/login",
			templateUrl:"login.html",
			controller:"ctrllogin"}
			)
	.state(
			"juego",
			{url:"/juego",
			templateUrl:"AdivinaElNumero2.html",
			controller:"Control"}
			)
		.state(
			"regist",
			{url:"/regist",
			templateUrl:"registrar.html",
			controller:"ctrlregist"}
			)

			.state(
			"formAlta",
			{url:"/formAlta",
			templateUrl:"formAlta.php",
			controller:"CTROLPersonaAlta"}
			)

			.state(
			"formmenu",
			{url:"/formmenu",
			templateUrl:"formGrilla.php",
			controller:"CTROLformGrilla"}
			)


			$urlRouterProvider.otherwise("/persona/alta"); 
		//	$urlRouterProvider.otherwise("/persona/alta"); // cada uno de los estados es un array /el routeo se maneja a traves de estados, estos estados los provee el stateProvider /el estado recibe primero el nombre
}); // .config es un modulo



miapp.controller("controlinicio", function($scope){


});

miapp.controller("controlPersonaMenu", function($scope,$state){
	 $scope.irAAlta=function(){
	 	$state.go("persona.alta");
 	 };

});


miapp.controller("CTROLPersonaAlta", function($scope,$state,FileUploader){
$scope.subidorDeArchivo= new FileUploader({url:'archivo.php'});



});



miapp.controller("CTROLformGrilla", function($scope,$state){
 



});




miapp.controller("PersonaAlta", function($scope){
 

});

miapp.controller("ctrllogin", function($scope){


});

miapp.controller("ctrlregist", function($scope,$state,FileUploader){
$scope.mail="";
$scope.subidorDeArchivo= new FileUploader({url:'archivo.php'});

});



miapp.controller("Control", function($scope){
 
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
		$scope.result2=" ";
	
	}



});





