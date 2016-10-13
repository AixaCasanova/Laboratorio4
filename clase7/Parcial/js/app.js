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
	.state('grillaU',
	{url: '/grillaU',
	templateUrl: 'grillaU.html',
	controller: 'controlGrillaU'})
 
 	.state('altaUsr',
	{url: '/altaUsr',
	templateUrl: 'regist.html',
	controller: 'controlGrillaU'})

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
	.state('ModificarV',
	{url: '/ModificarV/:dni:sexo:fvot:partido:foto',
	templateUrl:'votar.html',
	controller: 'controlvervotos'})

	 .state('regist',
	{url: '/regist',
	templateUrl: 'regist.html',
	controller: 'controlRegist'})

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
app.controller('controlMenu', function($scope, $http,$auth) 
{
    //$scope.ver=true;
	$scope.DatoTest="**Menu**";

	if ($auth.isAuthenticated()) {
			//console.info("token",$auth.getPayload());
			$scope.datos=$auth.getPayload();
			$scope.ver2=true;
			$scope.fto=$scope.datos.foto;
			$scope.usr=$scope.datos.usuario;
			console.log($scope.datos.usuario);
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


  	$scope.Guardar=function()
  	{
		console.log($scope.uploader.queue);
		if($scope.uploader.queue[0]!=undefined)
		{
			var nombreFoto = $scope.uploader.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		$scope.uploader.uploadAll();
	  	console.log("persona a guardar:");
	    console.log($scope.persona);
		$state.go("grilla");
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

 	$scope.Borrar=function(persona)
 	{
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

//---------------------------- 

app.controller('ControlL', function($scope,$http,$state,$auth)//, $routeParams, $location)
{
	$scope.usuario={};
	$scope.usuario.mail="aixa@mail.com";
	$scope.usuario.pass="1234";
	$scope.usuario.tipo="";
	$scope.usuario.foto="";
	 
	if ($auth.isAuthenticated()) {
	 	console.info("token",$auth.getPayload());
	 	$scope.ver=false;
	 	$scope.resp="logueado";
	}else{
	 	$scope.ver=true;
	 	$scope.resp="Deslogueado";
		//$state.go('login');//ver esta linea
	} 

	$scope.authenticate = function(provider)
	{
	    $auth.authenticate(provider);
	    console.log("Provider: ");
	    console.log(provider);
	};
		    

	$scope.loguer=function()
	{

		$http.post('PHP/nexo.php', { datos: {accion :"loguear", mail:$scope.usuario.mail, pass:$scope.usuario.pass}})
	 	.then(function(respuesta) 
	 	{     
			$scope.usuario.tipo=respuesta.data.tipo;
		 
		   	if (respuesta.data.Mail == $scope.usuario.mail && respuesta.data.pass == $scope.usuario.pass) 
		    {
		    	console.log("coincinde!");
				$scope.ver=false;	
				$scope.resp="Logueado"; 
				$scope.usuario.foto=respuesta.data.foto;
			
				$auth.login($scope.usuario)
				.then(function(response) 
				{
					console.info("correcto",response);
					//------------------
					if ($auth.isAuthenticated()) 
					{
						console.info("token",$auth.getPayload());
					}else
					{
						console.info("notoken",$auth.getPayload());
					}
								 
				})	
				.catch(function(response) {
				    console.info("no volvio bien auth: ",response);
				});

		    }else
		    {
		    	console.log("no coincinde!");
		      	alert("usuario o contraseña invalidos!");
		    }

		},function errorCallbac(response) {
			$scope.ListadoL= [];
			console.log(response);
	 	});
 		 
	}


	$scope.Desloguear=function()
	{
		$auth.logout();
		$scope.resp="Deslogueado";	 
		$scope.ver=true;		 
	}
});

//----------------------------
app.controller('controlvotar', function($scope,$http,$state,$auth,FileUploader)//, $routeParams, $location)
{
	$scope.voto={};
	$scope.voto.dni=33333;
	$scope.voto.s="femenino";
	$scope.voto.fvot= new Date("08/02/2016");
	$scope.voto.partido="partido1";
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	$scope.voto.dni2=111;    
	$scope.res="";
	$scope.datos=$auth.getPayload();
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
			
		 	

			if ($scope.datos.perfil == "user") {}else{
				$state.go("vervotos");
			}
	 	
	 	console.log(respuesta);

		},function errorCallbac(response) {
			console.log(response);
	 	 });
	
 		
			if ($scope.datos.perfil == "user") {}else{
			 	$state.go("vervotos");
				$state.go($state.current, {}, {reload: true});
			}
	 	 
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

app.controller('controlvervotos', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{	

	$http.get('PHP/nexo.php', { params: {accion :"vervotos"}})
	.then(function(respuesta) {     
		$scope.listaVotos = respuesta.data.votos;	
	},function errorCallbac(response) {
		console.log(response);
	});
 		 

	$scope.BorrarV=function(voto)
	{
		$http.post("PHP/nexo.php",{datos:{accion :"BorrarV",voto:voto}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		.then(function(respuesta) 
		{                
			console.log(respuesta);
			$state.go("vervotos");
			$state.go($state.current, {}, {reload: true});

	    },function errorCallback(response) {        
	        console.log( response);           
	    });

		$state.go($state.current, {}, {reload: true});

	}
    
	$scope.ModificarV=function(voto)
	{
		$scope.voto={};
		$scope.DatoTest="**Modificar**";
		$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
		console.log($stateParams);//$scope.persona=$stateParams;
		$scope.voto.fvot=$stateParams.fvot;
		$scope.voto.partido=$stateParams.partido;
		$scope.voto.dni2=$stateParams.dni;
		$scope.voto.dni=$stateParams.dni;
		$scope.voto.foto=$stateParams.foto;
	
			
		$scope.uploader.onSuccessItem=function(item, response, status, headers)
		{
			$http.post('PHP/nexo.php', { datos: {accion :"modificarV",voto:$scope.voto}})
			.then(function(respuesta) 
			{
				console.log("hasat aca!!!");
				console.log(respuesta);
			},
			function errorCallback(response)
			{
				//aca se ejecuta cuando hay errores
				console.log(response);     			
			});
			console.info("Ya guardé el archivo.", item, response, status, headers);
		};

		if($scope.uploader.queue[0]!=undefined)
		{
			var nombreFoto = $scope.uploader.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		$scope.uploader.uploadAll();
			
	}

});

//----------------------------------------------------------------

app.controller('controlRegist', function($scope,$http,$state,FileUploader)//, $routeParams, $location)
{
	
	$scope.usuario={};
	$scope.usuario.mail="";
	$scope.usuario.pass="";
	$scope.usuario.tipo="user";
	$scope.usuario.foto="";
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});


	$scope.regist=function()
	{
		if ($scope.usuario.foto=="") {$scope.usuario.foto="sinfoto.jpg";}
			
	 	$http.post('PHP/nexo.php', { datos: {accion :"Regist",voto:$scope.voto}})
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

	$scope.uploader.onSuccessItem=function(item, response, status, headers)
	{
		$scope.usuario.foto=item._file.name;
		$http.post('PHP/nexo.php', { datos: {accion :"upIMGR",usuario:$scope.usuario}})
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
			 
	};


});

//---------------------------------------------

app.controller('controlGrillaU', function($scope, $http, $state,FileUploader)
{
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
  	$scope.DatoTest="**grilla usuarios**";
 	
 	$http.get('PHP/nexo.php', { params: {accion :"traerU"}})
 	.then(function(respuesta) 
 	{     	
      	$scope.ListadoPersonas = respuesta.data.listado;
      	console.log(respuesta);
    },function errorCallback(response) {
     	$scope.ListadoPersonas= [];
     	console.log( response);
 	});


 	$scope.BorrarU=function(persona)
 	{
		console.log("borrar"+persona);

		$http.post("PHP/nexo.php",{datos:{accion :"BorrarU",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	 	.then(function(respuesta) {       
	        //aca se ejetuca si retorno sin errores        
	        console.log(respuesta.data);
			$state.go($state.current, {}, {reload: true});
	    },function errorCallback(response) {        
	        //aca se ejecuta cuando hay errores
	        console.log( response);           
	 	});

  		$state.go($state.current, {}, {reload: true});
 	}

});


//---------------------------------------------

 
