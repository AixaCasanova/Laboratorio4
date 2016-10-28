angular
  .module('app')
  .service('bandera', function ($http) 
  {

    //esto es funciones asincronas cuando le pegabas directo con el gen como antes es sincrona
      this.TraerSoloImagenes=TraerSoloImagenes;
      var url = "http://www.egos27.somee.com/api/bandera/";
      this.TraerUnPais=TraerUnPais;

      //--------------------------------------------------
      function TraerSoloImagenes() //esta es publica por que dos lineas mas arribas tiene el this
      {
          return $http.get(TraerUrl()).then(
          function(respuesta){ //retorna la promesa
              // console.log("respuesta dentro de la funcion:");
              //console.info(respuesta.data);
              //return respuesta.data.Paises;
          
          //-----------este si anda---------------
              // var log = [];
              // angular.forEach(respuesta.data.Paises, function(value) 
              // {                 
              //     this.push(value.Bandera);
              // }, log);
  
              // return log;
          //--------------------------------------------
          var paises =respuesta.data.Paises;
           var res= paises.map(
              function(obj)
              { 
               var rObj = {};
               rObj[obj.clave] = obj.valor;
               return rObj;
               console.info(rObj);
              }
            );
          //  console.info(res);

          },
          function(error){ //retorna la promesa
              console.info("error:"+error); 

          });

      };
      //---------------------------------------------------
      function TraerUnPais(Pais) //esta es publica por que dos lineas mas arribas tiene el this
      {
          return $http.get(TraerUrl(Pais)).then(
         function(respuesta){ //retorna la promesa
        
              // return respuesta.data.Paises;
              return respuesta.data;

          },
          function(error){ //retorna la promesa
              console.info(error); 

          });

      };

      //----------------------------------
      //esta funcion es privada por q no tiene this
      function TraerUrl(parametro)
      {
        if (!parametro)
         {
          return url;
        }else{
          return url+'/'+parametro;
        }

      };

      this.traerTodos=function() //esta es publica por que tiene el this aca mismo
      {

         return $http.get(TraerUrl()).then(
         function(respuesta){ //retorna la promesa
              // console.log("respuesta dentro de la funcion:");
              // console.info(respuesta.data.Paises);
              return respuesta.data.Paises;

          },
          function(error){ //retorna la promesa
              console.info(error); 

          });

      }

  })

//slim ??? qe es ??? que es farebase?? 
//clase q viene vermos factory 

 //servicio q da de alta lista y modifica en  servicio llama a api rest carpeta con slim del servidor  para el tp un ser para casa entidad servicio.traerTodasLasPersonas etc ahi accede a la bdd