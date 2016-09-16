
var app = angular.module('ABMangularPHP', ['ui.router', 'angularFileUpload'])//esto permite incluir el módulo 'ui.router' al módulo 'ABMangularPHP'
.config(function($stateProvider, $urlRouterProvider)
{
	$stateProvider
	.state('menu',
	{url: '/menu',
	templateUrl: 'menu.html',
	controller: 'controlMenu'})
	.state('alta',
	{url: '/alta',
	templateUrl: 'alta.html',
	controller: 'controlAlta'})
	.state('modificacion',
	{url: '/modificacion/{id}?:nombre:apellido:dni:foto',
	templateUrl: 'alta.html',
	controller: 'controlModificacion'})
	.state('grilla',
	{url: '/grilla',
	templateUrl: 'grilla.html',
	controller: 'controlGrilla'});
	$urlRouterProvider.otherwise('/menu');
});

app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});


app.controller('controlAlta', function($scope, $http, $state, FileUploader) {
  $scope.DatoTest="**alta**";
  

//inicio las variables
  $scope.uploader=new FileUploader({url:'PHP/nexo.php'});
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";
  //$scope.foto="fotos/pordefecto.png";
  //$scope.persona.foto="fotos/pordefecto.png";
  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
	$http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
	  .then(function(respuesta) {     	
			 //aca se ejetuca si retorno sin errores      	
		 console.log(respuesta.data);
		 $state.go("grilla");

	},function errorCallback(response) {     		
			//aca se ejecuta cuando hay errores
			console.log( response);     			
	  });
	console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(){
	console.log($scope.uploader.queue);
	if($scope.uploader.queue[0]!=undefined)
	{
		var nombreFoto = $scope.uploader.queue[0]._file.name;
		$scope.persona.foto=nombreFoto;
	}
	$scope.uploader.uploadAll();
  	console.log("persona a guardar:");
    console.log($scope.persona);
	

  

  }
});


app.controller('controlGrilla', function($scope, $http, $state) {
  	$scope.DatoTest="**grilla**";
 	
 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
     			/*

					https://docs.angularjs.org/api/ng/service/$http

     			the response object has these properties:

				data – {string|Object} – The response body transformed with the transform functions.
				status – {number} – HTTP status code of the response.
				headers – {function([headerName])} – Header getter function.
				config – {Object} – The configuration object that was used to generate the request.
				statusText – {string} – HTTP status text of the response.
						A response status code between 200 and 299 is considered a success
						 status and will result in the success callback being called. 
						 Note that if the response is a redirect, XMLHttpRequest will 
						 transparently follow it, meaning that 
						 the error callback will not be called for such responses.
 	 */
 	 });
	/*$scope.Modificar=function(persona)
	{
		$state.go("modificacion", persona);
	};*/

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);



$http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
		 $http.get('PHP/nexo.php', { params: {accion :"traer"}})
		.then(function(respuesta) {     	

			 $scope.ListadoPersonas = respuesta.data.listado;
			 console.log(respuesta.data);

		},function errorCallback(response) {
				 $scope.ListadoPersonas= [];
				console.log( response);
		 });

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

/*
     $http.post('PHP/nexo.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
 	}




 	/*$scope.Modificar=function(persona){
 		$http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
		  .then(function(respuesta) {     	
				 //aca se ejetuca si retorno sin errores      	
			 console.log(respuesta.data);
			 location.href="formGrilla.html";

		},function errorCallback(response) {     		
				//aca se ejecuta cuando hay errores
				console.log( response);     			
		  });
 		/*console.log("Modificar"+id);
		$http.post("PHP/nexo.php", {datos:{accion:"buscar", id:id}})
		.then(function(respuesta)
		{
			var persona=respuesta.data;
			$state.go("alta");//location.href="formAlta.html";
			$scope.DatoTest=persona.nombre;
			console.log(persona);
		} ,function errorCallback(response) {        
			//aca se ejecuta cuando hay errores
			console.log(response);           
		});
 	}*/





});
app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{
	$scope.persona={};
	$scope.DatoTest="**Modificar**";
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	console.log($stateParams);//$scope.persona=$stateParams;
	$scope.persona.id=$stateParams.id;
	$scope.persona.nombre=$stateParams.nombre;
	$scope.persona.apellido=$stateParams.apellido;
	$scope.persona.dni=$stateParams.dni;
	$scope.persona.foto=$stateParams.foto;
	$scope.uploader.onSuccessItem=function(item, response, status, headers)
	{
		$http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
		.then(function(respuesta) 
		{
			//aca se ejetuca si retorno sin errores      	
			console.log(respuesta.data);
			$state.go("grilla");
		},
		function errorCallback(response)
		{
			//aca se ejecuta cuando hay errores
			console.log( response);     			
		});
		console.info("Ya guardé el archivo.", item, response, status, headers);
	};
	$scope.Guardar=function(persona)
	{
		if($scope.uploader.queue[0]!=undefined)
		{
			var nombreFoto = $scope.uploader.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		$scope.uploader.uploadAll();
	}
});
