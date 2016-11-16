angular
  .module('app')
  .controller('CtrolGeneral', function($scope,$rootScope, data, $auth ,$stateParams, $state, i18nService, uiGridConstants) {
   

 
       if ($auth.isAuthenticated()) {
       
        $scope.datos=$auth.getPayload();
        $scope.usuarioAver="Bienvenido "+ $scope.datos.nombre;  
        $scope.ver=false;
        $scope.userAVer="Bienvenido "+$scope.datos.nombre;
        if ($scope.datos.perfil == "administrador") {
      
          $scope.esAdmin=true;
          $scope.esVend=true;
        }else if ($scope.datos.perfil == "comprador") {
          $scope.esAdmin=false;
          $scope.esVend=false;
        }else if ($scope.datos.perfil == "vendedor") {
          $scope.esAdmin=false;         
          $scope.esVend=true;
        } 
       
      }else{
        console.info("llega al ctrol gral?3")
        console.info("notoken",$auth.getPayload());
          $scope.SeVe=false;
          $scope.usuarioAver="";
          $scope.ver=true;
      }
 
  

  })
