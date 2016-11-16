angular
  .module('app')
  .service('ServClienteBase', function ($http,factorybddCliente) {
    this.Nombre = "ServClienteBase";
 
    var url = factorybddCliente.Api;
    var urlM = factorybddCliente.Api2;
    var urlE = factorybddCliente.Api3;
    var urlA = factorybddCliente.Api4;
    

  function TraerUrl(parametro,accion){
 
      if (!parametro)
      {
        return url;
      }
      else{
       
         if (accion=="modif")
         {
         
           return urlM + "/" + parametro;
      
         }else if (accion=="elim") {
              return urlE + "/" + parametro;
         }else if (accion=="alta") {
              return urlA + "/" + parametro;
         }
         else{
            return url + "/" + parametro;;
          }
      }

    }
//-------------------
 this.ModiCliente =function(cliente){
   qhago="modif";
      return $http.post(TraerUrl(cliente,qhago)).then(
        function (respuesta){
          
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
        );
    }
//--------------------

  
    this.ElimCliente =function(cliente){
      qhago="elim";
      return $http.post(TraerUrl(cliente,qhago)).then(
        function (respuesta){
          
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
        );
    }


//--------------------

    this.AltaCliente =function(cliente){
             qhago="alta";
          return $http.post(TraerUrl(cliente,qhago)).then(
            function (respuesta){
            
              return respuesta.data;
              
            },
            function (error){
              return error;
            }
            );
        }

        //------------------------

             

  
    this.TraerCliente =function(){
      return $http.get(TraerUrl()).then(
        function (respuesta){
  
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
        );
    }


  })//Cierra Servicio
