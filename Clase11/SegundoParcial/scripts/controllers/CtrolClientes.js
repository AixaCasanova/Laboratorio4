angular
  .module('app')
  .controller('CtrolClientes', function($scope,$rootScope, data, $auth ,ServCliente,$stateParams, $state, i18nService, uiGridConstants) {
 
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

  
    $scope.gridOptionsClientes = {};
    $scope.gridOptionsClientes.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsClientes.paginationPageSize = 25;
    $scope.gridOptionsClientes.columnDefs = columnDefs();
    $scope.gridOptionsClientes.enableFiltering = true;
    i18nService.setCurrentLang('es');
  


      ServCliente.TraerCliente().then(function(resp){
       $scope.gridOptionsClientes.data=resp;
        
        $scope.listaUser=resp;
        });
 


      if ($stateParams['parametro'] != null) 
      {

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
 
        $scope.usuario={};
        $scope.usuario.nombre="Octavio";
        $scope.usuario.apellido="Villegas";
        $scope.usuario.mail="Octavio@MAIL.COM";
        $scope.usuario.dir="calle falsa 888";
        $scope.usuario.tel=123456;
        $scope.usuario.pass="123ABC";
        $scope.usuario.passRep="123ABC";
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
                 
                $state.go("clientes");
                
            })
           
      }

       $scope.ElimC=function()
      {
          ServCliente.ElimCliente(JSON.stringify($scope.usuario)).then(function(resp)
            {
                
                $state.go("clientes");
                
            })
           
      }

      $scope.AltaC=function()
      {
          ServCliente.AltaCliente(JSON.stringify($scope.usuario)).then(function(resp)
            {
                 
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
