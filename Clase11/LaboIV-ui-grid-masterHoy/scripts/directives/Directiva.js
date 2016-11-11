angular
  .module('app')
  .directive('utnSaludo', function(){
//diempre comienza con minuscula

  	return {template:"hola mundo"}

  })
  .directive("utnSaludoDos",function(){

  	return {
  		replace:true,
  		restrict:"MEAC",	//
  		template:"<h1>hola mundo</h1>"
  		
  		}

  })
  .directive("utnTitulo",function(){

  	return {
  		replace:true,
  		restrict:"E",	//
  		// template:"<h1>{{titulo}}</h1>"
  		templateUrl:"templates/templateTitulo.html"
  		}

  })
    .directive("utnTituloParametro",function(){

  	return {
  		scope:{miTitulo:'@miparametro'},
  		replace:true,
  		restrict:"E",	//
  		// template:"<h1>{{titulo}}</h1>"
  		templateUrl:"templates/templateTitulo.html"
  		}

  })
      .directive("bandera",function(){
  	return {
  		scope:{nombrepais:'@miparametro',
  			   fotobandera:'@miparametro2'},
  		replace:true,
  		restrict:"E",	//
  		// template:"<h1>{{titulo}}</h1>"
  		templateUrl:"templates/templateBandera.html"
  		}

  })
  .directive("miBandera",function(){
  	return {
  		scope:{miBanderaParam:'=labanderaporparametro'},
  		replace:true,
  		restrict:"E",	
  		templateUrl:"templates/templateBandera2.html"
  		}

  })


  //se pueden agregar todaas las directivas que se quiera y a lo ultimo el ;

  ;//cierre del modulo

  //template ara mapas  podes hacer 3 directivas template 1 marca template muchas marcas
   