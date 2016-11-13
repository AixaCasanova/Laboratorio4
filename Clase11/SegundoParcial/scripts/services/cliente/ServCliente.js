angular
  .module('app')
  .factory('ServCliente', function (ServClienteBase) {
   
    var objeto = {};
    objeto.nombre = "Factory con servicio de Banderas";
    objeto.TraerCliente = TraerCliente;
    objeto.AltaCliente = AltaCliente;
    objeto.ModiCliente = ModiCliente;
    objeto.ElimCliente = ElimCliente;
    return objeto;

 
    function TraerCliente(){
     console.info("desde la factory con servicio",ServClienteBase);
     return ServClienteBase.TraerCliente();

    };

    function AltaCliente(cliente)
    {

      return ServClienteBase.AltaCliente(cliente);
    };

  
    function ModiCliente(cliente){
     console.info("desde la factory con servicio",ServClienteBase);
     return ServClienteBase.ModiCliente(cliente);

    };

     function ElimCliente(cliente){
     console.info("desde la factory con servicio",ServClienteBase);
     return ServClienteBase.ElimCliente(cliente);

    };





 


  })//Cierra factory
