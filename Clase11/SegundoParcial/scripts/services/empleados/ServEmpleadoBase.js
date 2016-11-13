angular
  .module('app')
  .service('ServEmpleadoBase', function ($http,factorybddEmpleado) {
    this.Nombre = "ServEmpleadoBase";
    var qhago ="";
    var url = factorybddEmpleado.Api;
    var urlM = factorybddEmpleado.Api2;
    var urlE = factorybddEmpleado.Api3;
    var urlA = factorybddEmpleado.Api4;
    var urlS = factorybddEmpleado.Api5;
      //Esta funcion es privada
    function TraerUrl(parametro,accion){
 
      if (!parametro)
      {
         
    
        return url;
      }
      else{
 
         if (accion=="modif")
         {
         
        
           return urlM + "/" + parametro;
      
         }else if (accion=="suc") {
 
          return urlS;
        }
         else if (accion=="elim") {
              return urlE + "/" + parametro;
         }else if (accion=="alta") {
              return urlA + "/" + parametro;
         }
         else{
            return url + "/" + parametro;;
          }
      }

    }
  
    this.TraerEmp =function(){
      return $http.get(TraerUrl()).then(
        function (respuesta){
  
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
        );
    }
    
        this.TraerListaSuc =function()
        {
           qhago="suc";
          return $http.get(TraerUrl("NA",qhago)).then(
          function (respuesta){
   
            return respuesta.data;
            
          },
          function (error){
            return error;
          }
          );
        }


     this.AltaEmpleado =function(emp){
            
            qhago="alta";
          return $http.post(TraerUrl(emp,qhago)).then(
            function (respuesta){
            
              return respuesta.data;
              
            },
            function (error){
              return error;
            }
            );
        }


    this.ModifEmp =function(empleado)
    {
          qhago="modif";
    
      return $http.post(TraerUrl(empleado,qhago)).then(
        function (respuesta){
       
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
        );
    }

    this.ElimEmp =function(empleado)
    {
        qhago="elim";
    
      return $http.post(TraerUrl(empleado,qhago)).then(
        function (respuesta){
       
          return respuesta.data;
          
        },
        function (error){
          return error;
        }
      );
    }

    




  })//Cierra Servicio
