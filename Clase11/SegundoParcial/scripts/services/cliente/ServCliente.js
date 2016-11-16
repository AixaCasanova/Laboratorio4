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
     
     return ServClienteBase.TraerCliente();

    };

    function AltaCliente(cliente)
    {

      return ServClienteBase.AltaCliente(cliente);
    };

  
    function ModiCliente(cliente){
  
     return ServClienteBase.ModiCliente(cliente);

    };

     function ElimCliente(cliente){
     
     return ServClienteBase.ElimCliente(cliente);

    };





 


  })//Cierra factory
