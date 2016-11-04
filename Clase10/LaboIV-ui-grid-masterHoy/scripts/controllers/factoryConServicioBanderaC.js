angular
  .module('app')
  .controller('FactoryServConBanderaC', function($scope, data, Bandera, factoryCServBandera, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    console.log("controller");
    
    $scope.gridOptionsTodasBanderas = {};
    $scope.gridOptionsTodasBanderas.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptionsTodasBanderas.paginationPageSize = 25;
    $scope.gridOptionsTodasBanderas.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptionsTodasBanderas.enableFiltering = true;

//--------------
 $scope.gridOptionsUnaBandera = {};
    $scope.gridOptionsUnaBandera.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptionsUnaBandera.paginationPageSize = 25;
    $scope.gridOptionsUnaBandera.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptionsUnaBandera.enableFiltering = true;
 
//--------------
 $scope.gridOptionsSoloFotos = {};
    $scope.gridOptionsSoloFotos.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptionsSoloFotos.paginationPageSize = 25;
    $scope.gridOptionsSoloFotos.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptionsSoloFotos.enableFiltering = true;
//--------------


    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

  console.info(factoryCServBandera);
    console.info(Bandera);


      factoryCServBandera.TraerTodos().then(function(resp){
       $scope.gridOptionsTodasBanderas.data=resp;
 
     });
 

    factoryCServBandera.TraerUnPais("Argentina").then(
      function(respuesta){
 
        $scope.gridOptionsUnaBandera.data = respuesta;
      },
      function(error){

      }
    );

    //----
        factoryCServBandera.TraerSoloImagen().then(
      function(respuesta){
        console.info("SOLOFOTO:",respuesta)
        $scope.gridOptionsSoloFotos.data = respuesta;
      },
      function(error){

      }
    );
    //----
  
    function columnDefs () {
      return [
         { field: 'Nombre', name: 'Nombre', width: 120
          ,enableFiltering: false
        },
        { field: 'Bandera',  name: 'Bandera', cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 120
          ,type: 'text'
          ,enableFiltering: false
        },
        { field: 'BanderaChica',  name: 'BanderaChica', cellTemplate:"<img width=\"30px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 140
          ,type: 'text'
          ,enableFiltering: false
        }  
      ];
    };
  })
