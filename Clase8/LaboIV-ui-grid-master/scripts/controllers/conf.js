angular
  .module('app')
  .controller('ConfCtrl', function($scope, data, i18nService, uiGridConstants, NgMap) 
  {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    data.data100().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    //  console.info(rta);
    $scope.lat="0";
    $scope.long="0";
    $scope.amis = [];


        var vm = this;
        NgMap.getMap().then(function(map)
        {
          vm.showCustomMarker= function(evt) 
          {
            map.customMarkers.foo.setVisible(true);
            map.customMarkers.foo.setPosition(this.getPosition());
            map.customMarkers.usa.setVisible(false);
            map.customMarkers.can.setVisible(false);
            map.customMarkers[el.className].setContent(el.innerHTML);
            map.customMarkers[el.className].setVisible(true);
            map.customMarkers[el.className].draw();
          };
          vm.closeCustomMarker= function(evt)
          {
            this.style.display = 'none';
          };
        
        });




      $scope.vermapa = function(parametro)
      {
        $scope.lat=parseInt(parametro.latitud);
        $scope.long=parseInt(parametro.longitud);
        // console.info(parametro.latitud);
      }

         $scope.veramigos = function(parametro)
      {
        console.info(parametro.amigos[0].latitud);
     
        $scope.amis = parametro.amigos;
      }


    });

   
 

    



    //console.log(uiGridConstants);

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'avatar', name: 'avatar',
        cellTemplate:'<img src="{{grid.getCellValue(row, col)}}">'  

          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...',
            
              }
        },
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
         { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: 'Male', label: 'Masculino'},
              {value: 'Female', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexo'
        },
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        },

        { field: 'amigos', name: 'amigos', cellTemplate:'<input type="button" value="Amigos" ng-click="grid.appScope.veramigos(row.entity)">' },
        { field: 'latitud', name: 'latitud'},
        { field: 'logitud', name: 'logitud'},
         { field: 'Mapa',  name:{'logitud':'logitud','latitud':'latitud'}, cellTemplate:'<input type="button" value="mapa" ng-click="grid.appScope.vermapa(row.entity)">' }
      ];
    }
 

  })
//como mostrar con uigrid una imagen 