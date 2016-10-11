/* juego usuario y result en la bdd y login tmb en la bdd piedra papel y tij y jueg dalton p juegos */
var app = angular.module('ABMangularPHP', ['ui.router', 'angularFileUpload', 'satellizer'])//esto permite incluir el módulo 'ui.router' al módulo 'ABMangularPHP'
.config(function($stateProvider, $urlRouterProvider, $authProvider)
{

 
	$authProvider.loginUrl = "Parcial/jwt/php/auth.php";
	$authProvider.tokenName = "MitokenGeneradoEnPhp";
	$authProvider.tokenPrefix = "Aplicacion";
	$authProvider.authHeader="data";

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
	controller: 'controlGrilla'})
//---------------------nuevo
	.state('log',
	{url: '/log',
	abstract:true,
	templateUrl: 'logAbs.html',
	})
	.state(
	"log.login",{
	url:"/login",
	views:{"contenido":{
	templateUrl:"login.html",
	controller:"ControlL"}
	}
	})
	//------------
	 .state('regist',
	{url: '/regist',
	templateUrl: 'regist.html',
	controller: 'controlGrilla'})
	 .state('vervotos',
	{url: '/vervotos',
	templateUrl: 'vervotos.html',
	controller: 'controlvervotos'})
	.state('votar',
	{url: '/votar',
	templateUrl: 'votar.html',
	controller: 'controlvotar'});
//---------------------

	$urlRouterProvider.otherwise('/menu');
});


//----------------------------
app.controller('controlMenu', function($scope, $http,$auth) {
//$scope.ver=true;
	  $scope.DatoTest="**Menu**";

	if ($auth.isAuthenticated()) {
			//console.info("token",$auth.getPayload());
			$scope.datos=$auth.getPayload();
			$scope.ver2=true;
			//console.log($scope.datos.perfil);
			if ($scope.datos.perfil == "user") {$scope.ver=false;}else{$scope.ver=true;}
	}else{
		console.info("notoken",$auth.getPayload());
		$scope.ver2=false;
	}

});

//----------------------------
app.controller('controlAlta', function($scope, $http, $state, FileUploader) 
{
  $scope.DatoTest="**alta**";
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

//----------------------------
app.controller('controlGrilla', function($scope, $http, $state)
 {
  	$scope.DatoTest="**grilla**";
 	
 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);

 	 });

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


 	}

});

//----------------------------
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
			console.log(response);     			
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



//---------------------------- nuevo

app.controller('ControlL', function($scope,$http,$state,$auth)//, $routeParams, $location)
{
	$scope.usuario={};
	$scope.usuario.mail="aixa@mail.com";
	$scope.usuario.pass="1234";
	$scope.usuario.tipo="";
	
	 
	 if ($auth.isAuthenticated()) {
	 	console.info("token",$auth.getPayload());
	 	$scope.ver=false;
	 	$scope.resp="logueado";
	 }else{
	 	$scope.ver=true;
	 	$scope.resp="Deslogueado";
	 //$state.go('login');//ver esta linea
	 } 


	$scope.authenticate = function(provider) {
		      $auth.authenticate(provider);
		      console.log("Provider: ");
		      console.log(provider);
		    };
		    

	$scope.loguer=function()
	{

		$http.post('PHP/nexo.php', { datos: {accion :"loguear", mail:$scope.usuario.mail, pass:$scope.usuario.pass}})
	 	.then(function(respuesta) {     
		$scope.usuario.tipo=respuesta.data.tipo;
	 
	 // 		console.log(respuesta.data);
		// 	console.log("mailbdd: "+respuesta.data.Mail);
		// 	console.log("passbdd: "+respuesta.data.pass);
		// 	console.log("mailingres: "+$scope.usuario.mail);
		// 	console.log("mailingres: "+ $scope.usuario.pass);
	      	 if (respuesta.data.Mail == $scope.usuario.mail && respuesta.data.pass == $scope.usuario.pass) 
	      	 	{
	      	 		console.log("coincinde!");
					$scope.ver=false;	
					$scope.resp="Logueado"; 

					$auth.login($scope.usuario)
					.then(function(response) 
					{
						console.info("correcto",response);

						//------------------
						if ($auth.isAuthenticated()) {
							console.info("token",$auth.getPayload());
						}else{
							console.info("notoken",$auth.getPayload());
						}
							 
					})	
					.catch(function(response) {
					    console.info("no volvio bien auth: ",response);
					});

	      	 	}else{
	      	 		 console.log("no coincinde!");
	      	 		
	      	 	}

		},function errorCallbac(response) {
			$scope.ListadoL= [];
			console.log(response);
	 	 });
 		 
	}


	$scope.Desloguear=function()
	{
	$scope.resp="Deslogueado";	 
	$scope.ver=true;
	
 		 
	}


});




//----------------------------
app.controller('controlvotar', function($scope,$http,$state,FileUploader)//, $routeParams, $location)
{
	$scope.voto={};
	$scope.voto.dni=33333;
	$scope.voto.s="femenino";
	$scope.voto.fvot= new Date("08/02/2016");
	$scope.voto.partido="partido1";
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	$scope.voto.dni2=111;    
	$scope.res="";
	$scope.votar=function()
	{

		$http.post('PHP/nexo.php', { datos: {accion :"AltaVoto", voto:$scope.voto}})
	 	.then(function(respuesta) {     

	 		$scope.voto={};
			$scope.voto.dni="";
			$scope.voto.s="";
			$scope.voto.fvot= "";
			$scope.voto.partido="partido1";
			$scope.voto.dni2=""; 
			$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
			$scope.res="Voto Recibido!";

	 	
	 	console.log(respuesta);

		},function errorCallbac(response) {
			console.log(response);
	 	 });
 		 
	}


	$scope.uploader.onSuccessItem=function(item, response, status, headers)
	{
		$scope.voto.foto= "../fotos/"+item._file.name;
		$http.post('PHP/nexo.php', { datos: {accion :"upIMG",voto:$scope.voto}})
		.then(function(respuesta) 
		{
			//aca se ejetuca si retorno sin errores      	
			console.log(respuesta);
			
		},
		function errorCallback(response)
		{
			//aca se ejecuta cuando hay errores
			console.log(response);     			
		});
		 
	}


});


//-----------------------------


app.controller('controlvervotos', function($scope,$http,$state,FileUploader)//, $routeParams, $location)
{
	
//-----------------
$http.get('PHP/nexo.php', { params: {accion :"vervotos"}})
	 	.then(function(respuesta) {     
	 		$scope.listaVotos = respuesta.data.votos;
	 	
	 	

		},function errorCallbac(response) {
			console.log(response);
	 	 });
 		 

//------------------

	$scope.votar=function()
	{

		$http.post('PHP/nexo.php', { datos: {accion :"AltaVoto", voto:$scope.voto}})
	 	.then(function(respuesta) {     

	 		$scope.voto={};
			$scope.voto.dni="";
			$scope.voto.s="";
			$scope.voto.fvot= "";
			$scope.voto.partido="partido1";
			$scope.voto.dni2=""; 
			$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
			$scope.res="Voto Recibido!";

	 	
	 	console.log(respuesta);

		},function errorCallbac(response) {
			console.log(response);
	 	 });
 		 
	}


});