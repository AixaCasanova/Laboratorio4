angular
  .module('app')
  .controller('CtrolUsuario', function($scope,$stateParams,data, $auth,$state, ServUsuario, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
 
    
    $scope.gridOptionsUsuarios = {};
    $scope.gridOptionsUsuarios.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsUsuarios.paginationPageSize = 25;
    $scope.gridOptionsUsuarios.columnDefs = columnDefs();
    $scope.gridOptionsUsuarios.enableFiltering = true;
    i18nService.setCurrentLang('es');
    
      ServUsuario.TraerTodos().then(function(resp){
       $scope.gridOptionsUsuarios.data=resp;
       $scope.listaUser=resp;
  
     });

     
      //------------------------------


       ServUsuario.TraerListaSuc().then(function(resp){

            $scope.Lsucursales=resp;    
      
         });

    //------------------------------------
    
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
            $scope.SucElegida=ObjRecibido.sucursal;
            console.info("suc elegida",$scope.SucElegida);
            console.info("obj traida", ObjRecibido.sucursal);
              console.info("obj total:", ObjRecibido);
      }else
      {
      
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
        $scope.SucElegida="NoAplica";
        $scope.usuario.sucursal=$scope.SucElegida;
        console.info("dsd el else",$scope.usuario.sucursal);
      }
   //------------------------------------


      $scope.IrModificar = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("ModifUs",{parametro:parametro});
      }
      
      $scope.IrEliminar = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("EliminarUs",{parametro:parametro});
      }

      $scope.Volver = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("usuarios");
      }


       $scope.Modif=function()
      {
          $scope.usuario.sucursal=$scope.SucElegida;
          console.info("desde fun modif",$scope.SucElegida);
          ServUsuario.Modif(JSON.stringify($scope.usuario)).then(function(resp)
            {
         
                $state.go("usuarios");
                
            })
           
      }

       $scope.Elim=function()
      {
          ServUsuario.Elim(JSON.stringify($scope.usuario)).then(function(resp)
            {
                console.info("desde constroller",resp);
                $state.go("usuarios");
                
            })
           
      }

      $scope.AltaUs=function()
      {
        $scope.usuario.sucursal=$scope.SucElegida;
          ServUsuario.Alta(JSON.stringify($scope.usuario)).then(function(resp)
            {
                console.info("desde constroller",resp);
                $state.go("usuarios");
            })
           
      }
 
  //----------------------------------------
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
          { field: 'sucursal', name: 'sucursal', width: 120
          ,enableFiltering: false
        },
        { field: 'Modificar', name: 'Modificar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Modificar" ng-click="grid.appScope.IrModificar(row.entity)">'},
        { field: 'Eliminar', name: 'Eliminar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Eliminar" ng-click="grid.appScope.IrEliminar(row.entity)">'},
        

        //---------------
      ];
    };
  })
