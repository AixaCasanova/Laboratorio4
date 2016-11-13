angular
  .module('app')
  .controller('CtrolClientes', function($scope, data, $auth ,ServCliente,$stateParams, $state, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
 
    console.log("controller");
    
    $scope.gridOptionsClientes = {};
    $scope.gridOptionsClientes.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsClientes.paginationPageSize = 25;
    $scope.gridOptionsClientes.columnDefs = columnDefs();
    $scope.gridOptionsClientes.enableFiltering = true;
    i18nService.setCurrentLang('es');
  


      ServCliente.TraerCliente().then(function(resp){
       $scope.gridOptionsClientes.data=resp;
        console.info("desde constroller",resp);
  
        });
 

 //-------------------

 
      console.info($stateParams);
      if ($stateParams['parametro'] != null) 
      {
        console.info("aca entra??")
          var ObjRecibido=$stateParams['parametro'];
      

            $scope.usuario={};
            $scope.usuario.id_user=ObjRecibido.id_user;
            $scope.usuario.nombre=ObjRecibido.nombre;
            $scope.usuario.apellido=ObjRecibido.apellido;
            $scope.usuario.mail=ObjRecibido.mail;
            $scope.usuario.dir=ObjRecibido.direccion;
            $scope.usuario.tel=ObjRecibido.telefono;
            $scope.usuario.pass=ObjRecibido.password;
            $scope.usuario.estado = ObjRecibido.estado;
            $scope.usuario.tipo=ObjRecibido.tipo;
      }else
      {
        console.info("llego aca");
        $scope.usuario={};
        $scope.usuario.nombre="aixa";
        $scope.usuario.apellido="casanova";
        $scope.usuario.mail="mail@MAIL.COM";
        $scope.usuario.dir="calle falsa 123";
        $scope.usuario.tel=123456;
        $scope.usuario.pass="123456";
        $scope.usuario.passRep="123456";
        $scope.usuario.estado = "H";
        $scope.usuario.tipo="comprador";
        $scope.usuario.sucursal="NoAplica";
      }
      
      //----------------------------------

      $scope.Volver=function()
            {
              $state.go("clientes");
            }

 

      $scope.IrModificarCli = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("ModifCli",{parametro:parametro});
      }
      
      $scope.IrEliminarCli = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("EliminarCli",{parametro:parametro});
      }

       $scope.ModifC=function()
      {
          ServCliente.ModiCliente(JSON.stringify($scope.usuario)).then(function(resp)
            {
                console.info("desde constroller",resp);
                $state.go("clientes");
                
            })
           
      }

       $scope.ElimC=function()
      {
          ServCliente.ElimCliente(JSON.stringify($scope.usuario)).then(function(resp)
            {
                console.info("desde constroller",resp);
                $state.go("clientes");
                
            })
           
      }

      $scope.AltaC=function()
      {
          ServCliente.AltaCliente(JSON.stringify($scope.usuario)).then(function(resp)
            {
                console.info("desde constroller",resp);
                $state.go("clientes");
            })
           
      }

    function columnDefs () {
      return [
         { field: 'nombre', name: 'nombre', width: 120
          ,enableFiltering: false
        },
         { field: 'apellido', name: 'apellido', width: 120
          ,enableFiltering: false
        },
         { field: 'direccion', name: 'direccion', width: 120
          ,enableFiltering: false
        },
         { field: 'mail', name: 'mail', width: 120
          ,enableFiltering: false
        },
         { field: 'telefono', name: 'telefono', width: 120
          ,enableFiltering: false
        },
         { field: 'tipo', name: 'tipo', width: 120
          ,enableFiltering: false
        },
          { field: 'estado', name: 'estado', width: 120
          ,enableFiltering: false
        },
        { field: 'Modificar', name: 'Modificar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Modificar" ng-click="grid.appScope.IrModificarCli(row.entity)">'},
        { field: 'Eliminar', name: 'Eliminar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Eliminar" ng-click="grid.appScope.IrEliminarCli(row.entity)">'},
        


      ];
    };
  })
