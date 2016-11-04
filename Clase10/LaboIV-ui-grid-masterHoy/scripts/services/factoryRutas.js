angular
  .module('app')
  .factory('factoryRutas', function ($http) {    var objeto = {};
    objeto.nombre = "Factory de Rutas";

    objeto.ApiBanderas ="http://www.egos27.somee.com/api/bandera"
    return objeto;


    function TraerTodos(){
      return $http.get(TraerUrl()).then(
        function (respuesta){
          return respuesta.data.Paises;
        },
        function (error){
          return error;
        }
        );
    }
  })//Cierra factory
