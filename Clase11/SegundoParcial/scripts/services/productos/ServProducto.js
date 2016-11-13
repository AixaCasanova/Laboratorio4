angular
  .module('app')
  .factory('ServProducto', function (ServProductoBase) {
   
    var objeto = {};
    objeto.nombre = "Factory con servicio de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.ModifP=ModifP;
    objeto.AltaP = AltaP;
    objeto.EliminarP=EliminarP;
    
   
    return objeto;

    
    

    function TraerTodos(){
     console.info("desde la factory con servicio",ServProductoBase);
     return ServProductoBase.TraerTodos();

    };



    function AltaP(p)
    {
      return ServProductoBase.AltaP(p);
    };


    function ModifP(p)
    {
      return ServProductoBase.ModifP(p);
    };

 
 

    function EliminarP(p)
    {
      return ServProductoBase.EliminarP(p);
    };

  })//Cierra factory
