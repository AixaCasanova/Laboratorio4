angular
  .module('app')
  .controller('CtrolLogin', function($scope,$rootScope,$state,data, Servlogin, i18nService, uiGridConstants,$auth) 
  {
      $scope.usuario={};
      $scope.usuario.mail="";
      $scope.usuario.password="";
      $scope.usuario.tipo="";
      $scope.usuario.nombre="";
 
      console.log("llego?");
      $scope.ver=true;
 
      
     if ($auth.isAuthenticated()) {
       
        $scope.datos=$auth.getPayload();
        $scope.usuarioAver="Bienvenido "+ $scope.datos.nombre;  
        $scope.ver=false;
        $rootScope.userAVer="Bienvenido "+$scope.datos.nombre;
        if ($scope.datos.perfil == "administrador") {
          console.info("si pasa por aca en el inicio!");  
          $rootScope.esAdmin=true;
          $rootScope.esVend=true;
        }else if ($scope.datos.perfil == "comprador") {
          $rootScope.esAdmin=false;
          $rootScope.esVend=false;
        }else if ($scope.datos.perfil == "vendedor") {
          $rootScope.esAdmin=false;         
          $rootScope.esVend=true;
        } 
       
    }else{
      console.info("llega al ctrol gral?3")
      console.info("notoken",$auth.getPayload());
        $rootScope.SeVe=false;
        $rootScope.usuarioAver="";
        $scope.ver=true;
    }

       $scope.authenticate = function(provider)
       {
          $auth.authenticate(provider);
          console.info("Provider:",provider);
        };
            
      
         $scope.Volver=function()
            {
              $state.go("inicio");
            }

             $scope.Test=function(TipoTest)
            { 
              console.info("TipoTest:",TipoTest);
              $scope.users={};
              Servlogin.TraerTodos().then(function(resp){
                $scope.users=resp;
                console.info($scope.users); 
                console.info("test admin.....");
                //----------------
                $scope.users.forEach(function(resp){
                  // console.info(resp['mail']);
                  // console.info(resp['nombre']);
                  // console.info(resp['tipo']);
                 if (resp['tipo']==TipoTest) 
                 {
                    $scope.usuario.mail=resp['mail'];
                    $scope.usuario.password=resp['password'];
                    $scope.usuario.tipo=resp['tipo'];
                    $scope.usuario.nombre=resp['nombre'];              
                     console.info(resp['mail']);
                      console.info(resp['nombre']);
                     console.info(resp['tipo']);
                 }

                });
                 //---------------
              });
            }


      $scope.loguer=function()
      {

          Servlogin.TraerUnLogin($scope.usuario.mail).then(
          function(respuesta)
          {
            console.info("nom de resp:",respuesta.nombre);
            console.info("nom de scope:",$scope.usuario.nombre);
             console.info("mail de resp:",respuesta.mail);
            console.info("mail de scope:",$scope.usuario.mail);
            console.info("password de resp:",respuesta.password);
            console.info("password de scope:",$scope.usuario.password);
            console.info(respuesta);
            if ((respuesta.mail == respuesta.mail) && (respuesta.password == $scope.usuario.password) && (respuesta.nombre == $scope.usuario.nombre)) 
            {
              console.log("coincinde!");
              
              
              $rootScope.SeVe=true;
              $scope.ver=false; 
              $scope.resp="Logueado"; 

              
              console.info("que hay en auth:",$auth);
              console.info("token",$auth.getPayload());
              
              $auth.login(respuesta)
              .then(function(response) 
              {
                console.info("correcto",response);

                //------------------
                if ($auth.isAuthenticated()) {
                  console.info("token",$auth.getPayload());
                  
                  $scope.datos=$auth.getPayload();
                  $rootScope.userAVer="Bienvenido "+$scope.datos.nombre;
                  if ($scope.datos.perfil == "administrador") {
                    $rootScope.esAdmin=true;
                    $rootScope.esVend=true;
                  }else if ($scope.datos.perfil == "comprador") {
                    $rootScope.esAdmin=false;
                    $rootScope.esVend=false;
                  }else if ($scope.datos.perfil == "vendedor") {
                    $rootScope.esAdmin=false;         
                    $rootScope.esVend=true;
                   }               


                }else{
                  console.info("notoken",$auth.getPayload());
                }
                //----------------------------- 
              })  
              .catch(function(response) {
                  console.info("no volvio bien auth: ",response);
              });

            }else
            {
              console.log("no coincinde!");
              alert("usuario o contraseña invalidos!");  
            }

          })    
       
      }


     $scope.Desloguear=function()
      {   
        $auth.logout();
        $scope.resp="Deslogueado";   
        $scope.ver=true; 
        $rootScope.usuarioAver= ""; 
        $rootScope.SeVe=false; 
      }

})
