angular
  .module('app')
  .controller('CtrolOfertas', function($scope,$rootScope, data, $auth, ServOferta, i18nService, uiGridConstants) {
 
  //-------------------

 
       if ($auth.isAuthenticated()) {
       $scope.ver=true;
        var datos=$auth.getPayload();
      
        $rootScope.usuarioAver="Bienvenido "+ datos['nombre'];  
         $rootScope.SeVe=true;
        $rootScope.userAVer="Bienvenido "+ datos['nombre'];

        if (datos['perfil'] == "administrador") {
        
        console.info("datos.perfil: ",datos['perfil'])

          $rootScope.esAdmin=true;
          $rootScope.esVend=true;
        }else if (datos['perfil'] == "comprador") {
          $rootScope.esAdmin=false;
          $rootScope.esVend=false;
        }else if (datos['perfil'] == "vendedor") {
          $rootScope.esAdmin=false;         
          $rootScope.esVend=true;
        } 
       
      }else{
        console.info("llega al ctrol gral?3")
        console.info("notoken",$auth.getPayload());
          $rootScope.SeVe=false;
          $rootScope.usuarioAver="";
          $scope.ver=false;
      }

 //----------------------
    
    $scope.gridOptionsOfertas = {};
    $scope.gridOptionsOfertas.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsOfertas.paginationPageSize = 25;
    $scope.gridOptionsOfertas.columnDefs = columnDefs();
    $scope.gridOptionsOfertas.enableFiltering = true;
    i18nService.setCurrentLang('es');
  


      ServOferta.TraerTodos().then(function(resp){
       $scope.gridOptionsOfertas.data=resp;
        console.info("desde constroller",resp);
  
     });
 


  
    function columnDefs () {
      return [
         { field: 'id_oferta', name: 'id_oferta', width: 120
          ,enableFiltering: false
        },
         { field: 'descripcion', name: 'descripcion', width: 120
          ,enableFiltering: false
        },
         { field: 'precio', name: 'precio', width: 120
          ,enableFiltering: false
        }

      ];
    };
  })
