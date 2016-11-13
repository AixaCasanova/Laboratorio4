angular
  .module('app')
  .factory('ServOferta', function (ServOfertaBase) {
   
    var objeto = {};
    objeto.nombre = "Factory con servicio de Banderas";
    objeto.TraerTodos = TraerTodos;
   
    return objeto;

 
    function TraerTodos(){
     console.info("desde la factory con servicio",ServOfertaBase);
     return ServOfertaBase.TraerTodos();

    };


 


  })//Cierra factory
