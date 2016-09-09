var miapp = angular.module("AngularABM", ['ui.router']);
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

		.state(

			"persona.menu",{
				url:"/menu",
				views:{"contenido":{
					templateUrl:"personaMenu.html",
					controller:"controlPersonaMenu"}
					
				}
				/*url:"/menu",
				templateUrl:"personaMenu.html"*/
			})

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


			$urlRouterProvider.otherwise("/persona/alta"); // cada uno de los estados es un array /el routeo se maneja a traves de estados, estos estados los provee el stateProvider /el estado recibe primero el nombre
}); // .config es un modulo



miapp.controller("controlinicio", function($scope){


});

miapp.controller("controlPersonaMenu", function($scope,$state){
	 $scope.irAAlta=function(){
	 	$state.go("persona.	alta");
	 };

});



miapp.controller("PersonaAlta", function($scope){


});









