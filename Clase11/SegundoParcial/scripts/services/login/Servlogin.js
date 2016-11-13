angular
  .module('app')
  .factory('Servlogin', function (ServloginBase) {
   
    var objeto = {};
    objeto.nombre = "Servlogin";
    objeto.TraerUnLogin = TraerUnLogin;
    objeto.TraerTodos=TraerTodos;
    return objeto;

 
    function TraerUnLogin(pers)
    {
      console.info("desde servlogin",ServloginBase);
      return ServloginBase.TraerUnLogin(pers);
    };

        function TraerTodos(){
     console.info("desde la factory con servicio",ServloginBase);
     return ServloginBase.TraerTodos();

    };

 


  })//Cierra factory
