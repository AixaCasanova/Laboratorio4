angular
  .module('app')
  .factory('factorybddEmpleado', function ($http) {  
    var objeto = {};
    objeto.nombre = "factorybddEmpleado";
 

  objeto.Api5 ="http://localhost:8026/SegundoParcial/ws/sucursales";
  objeto.Api ="http://localhost:8026/SegundoParcial/ws/empleados";
  objeto.Api2 ="http://localhost:8026/SegundoParcial/ws/ModifUs";
  objeto.Api3 ="http://localhost:8026/SegundoParcial/ws/ElimUs";
  objeto.Api4 ="http://localhost:8026/SegundoParcial/ws/AltaUs";

    return objeto;


    function TraerEmp(){
        return $http.get(TraerUrl()).then(
        function (respuesta){
 
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }


    function TraerListaSuc(){
        return $http.get(TraerUrl()).then(
        function (respuesta){
        console.info("resp factory suc:",respuesta);
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }



      function ModifEmp(empleado){
     
      return $http.post(TraerUrl(empleado)).then(
        function (respuesta){
      
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }

    

      function ElimEmp(empleado){
     
      return $http.post(TraerUrl(empleado)).then(
        function (respuesta){
      
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }

      function AltaEmpleado(cliente){
      return $http.post(TraerUrl(cliente)).then(
        function (respuesta){
          console.info("desde factory bdd",respuesta);
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }


    
  })//Cierra factory
