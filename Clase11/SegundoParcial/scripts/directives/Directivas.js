angular
  .module('app')
  .directive("dirTabla",function(){

  	return {
  		replace:true,
  		restrict:"MEAC",	
  		templateUrl:"templates/TablaProd.html"
  		}

  }) 
  .directive("dirTablaUs",function(){

    return {
      replace:true,
      restrict:"MEAC",  
      templateUrl:"templates/TablaUser.html"
      }

  }) 
  .directive("dirTablaComp",function(){
    return {
      replace:true,
      restrict:"MEAC",  
      templateUrl:"templates/TablaComp.html"
      }

  }) 


  //se pueden agregar todaas las directivas que se quiera y a lo ultimo el ;

  ;//cierre del modulo

  //template ara mapas  podes hacer 3 directivas template 1 marca template muchas marcas
   