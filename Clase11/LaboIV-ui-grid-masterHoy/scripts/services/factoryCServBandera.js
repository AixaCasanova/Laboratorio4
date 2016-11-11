angular
  .module('app')
  .factory('factoryCServBandera', function (Bandera) {
   
    var objeto = {};
    objeto.nombre = "Factory con servicio de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.TraerUnPais = TraerUnPais;
    objeto.TraerSoloImagen = TraerSoloImagen;
    return objeto;

    function TraerUnPais(pais){
 
       return Bandera.TraerUnPais(pais);
    };
 
    function TraerTodos(){
     console.info("desde la factory con servicio",Bandera);
     return Bandera.TraerTodos();

    };



    function TraerSoloImagen(){
 
     return Bandera.TraerSoloImagen();

    };


  })//Cierra factory
