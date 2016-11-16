angular
  .module('app')
  .controller('CtrolProductos', function($scope,$rootScope, $auth,  data, $auth,$stateParams,$state, ServProducto, i18nService, uiGridConstants)
   {


    
    $scope.gridOptionsProductos = {};
    $scope.gridOptionsProductos.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsProductos.paginationPageSize = 25;
        
     if ($auth.isAuthenticated()) {
        //console.info("token",$auth.getPayload());
        $scope.datos=$auth.getPayload();
        var Perf=$scope.datos.perfil;
        $scope.per=$scope.datos.perfil;
       
    }else{
      console.info("notoken",$auth.getPayload());
    } 

         
     if (Perf!='comprador') {
      $scope.veralta=true;
      $scope.gridOptionsProductos.columnDefs = columnDefsVend();
     }else{
      $scope.veralta=false;
      $scope.gridOptionsProductos.columnDefs = columnDefsCom();
     }
    $scope.gridOptionsProductos.enableFiltering = true;
    i18nService.setCurrentLang('es');
    
     $scope.producto ={};
     console.info("parametros",$stateParams);  
     if ($stateParams['parametro'] != null ) 
      {
        var ObjRecibido=$stateParams['parametro'];
        $scope.producto.id_producto=ObjRecibido.id_producto;
        $scope.producto.descripcion=ObjRecibido.descripcion;
        $scope.producto.precio=ObjRecibido.precio;

      }
      else{
        $scope.producto.descripcion="Desc1";
        $scope.producto.precio=10;
      }
 

      ServProducto.TraerTodos().then(function(resp)
      {
         $scope.gridOptionsProductos.data=resp;
        $scope.listaProd=resp;
  
       }) ;
 

 
      $scope.VolverM=function()
            {
              $state.go("inicio");
            }


     $scope.AltaP=function()
      {

          ServProducto.AltaP(JSON.stringify($scope.producto)).then(function(resp)
            {          
              
                $state.go("productos");

            })      
      }

      $scope.IrModificarP = function(parametro)
      {

        console.log("que tiene el param??",parametro);
        $state.go("ModifP",{parametro:parametro});
      }
      
       $scope.IrEliminarP = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("EliminarP",{parametro:parametro});
      }
  


           $scope.ModifP=function()
            {

                ServProducto.ModifP(JSON.stringify($scope.producto)).then(function(resp)
                  {          
                    console.info(resp);
                      $state.go("productos");

                  })      
            }

      $scope.EliminarP=function()
            {

                ServProducto.EliminarP(JSON.stringify($scope.producto)).then(function(resp)
                  {          
                    console.info(resp);
                      $state.go("productos");

                  })      
            }
//------------------------  
 
      $scope.Volver=function()
            {
              $state.go("productos");
            }

    function columnDefsVend () {
      return [
         { field: 'id_producto', name: 'id_producto', width: 120
          ,enableFiltering: false
        },
         { field: 'descripcion', name: 'descripcion', width: 120
          ,enableFiltering: false
        },
         { field: 'precio', name: 'precio', width: 120
          ,enableFiltering: false
        },      
            { field: 'Modificar', name: 'Modificar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Modificar" ng-click="grid.appScope.IrModificarP(row.entity)">'},
            { field: 'Eliminar', name: 'Eliminar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Eliminar" ng-click="grid.appScope.IrEliminarP(row.entity)">'},
          

      ];
    };


    function columnDefsCom () {
      return [
         { field: 'id_producto', name: 'id_producto', width: 120
          ,enableFiltering: false
        },
         { field: 'descripcion', name: 'descripcion', width: 120
          ,enableFiltering: false
        },
         { field: 'precio', name: 'precio', width: 120
          ,enableFiltering: false
        },      
            

      ];
    };


})
