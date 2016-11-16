angular
  .module('app')
  .controller('CtrolOfertas', function($scope,$rootScope, data, $auth, ServOferta, i18nService, uiGridConstants) {
 
 
    
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
