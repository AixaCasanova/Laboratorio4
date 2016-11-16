angular
  .module('app')
  .controller('CtrolEmpleados', function($scope,$rootScope, $state, $auth ,data, ServEmpleado, $stateParams, i18nService, uiGridConstants) {
 
   

    
    $scope.gridOptionsEmpleados = {};
    $scope.gridOptionsEmpleados.paginationPageSizes = [25, 50, 75];
 
    $scope.gridOptionsEmpleados.paginationPageSize = 25;
    $scope.gridOptionsEmpleados.columnDefs = columnDefs();
    $scope.gridOptionsEmpleados.enableFiltering = true;
    i18nService.setCurrentLang('es');
  

  

      ServEmpleado.TraerEmp().then(function(resp){
       $scope.gridOptionsEmpleados.data=resp;
         
        $scope.listaUser=resp;

     });

      
     ServEmpleado.TraerListaSuc().then(function(resp){
          $scope.SucElegida=resp[0].nombre;
           
            $scope.Lsucursales=resp;    
      
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
            $scope.usuario.sucursal=ObjRecibido.sucursal;
            $scope.SucElegida=ObjRecibido.sucursal;


      }else
      {
   
        $scope.usuario={};
        $scope.usuario.nombre="mariano";
        $scope.usuario.apellido="matinez";
        $scope.usuario.mail="mariano@MAIL.COM";
        $scope.usuario.dir="calle falsa 321";
        $scope.usuario.tel=123456;
        $scope.usuario.pass="123456";
        $scope.usuario.passRep="123456";
        $scope.usuario.estado = "H";
        $scope.usuario.tipo="vendedor";
         
      $scope.usuario.sucursal=$scope.SucElegida;


      }
      
 
      
      $scope.VolverM=function()
            {
              $state.go("inicio");
            }



       $scope.ModificarEmp=function()
      {
         $scope.usuario.sucursal=$scope.SucElegida;
          ServEmpleado.ModifEmp(JSON.stringify($scope.usuario)).then(function(resp)
            {
               
                $state.go("empleados");
                
            })
           
      }
 
      
      $scope.Volver=function()
            {
              $state.go("empleados");
            }



       $scope.AltaEmpleado=function()
      {
 
    
              $scope.usuario.sucursal=$scope.SucElegida;
          ServEmpleado.AltaEmpleado(JSON.stringify($scope.usuario)).then(function(resp)
            {
              
          
                $state.go("empleados");

            })
           
      }

 

        $scope.ElimEmp=function()
        {
          $scope.usuario.quehago="elim";
            ServEmpleado.ElimEmp(JSON.stringify($scope.usuario)).then(function(resp)
            {
              
              $state.go("empleados");
                
            })
        }

               
       $scope.IrModificar = function(parametro)
      {
        $state.go("ModifEmp",{parametro:parametro});
      }
      
       $scope.IrEliminar = function(parametro)
      {
        //console.info(parametro['nombre']);
        
        $state.go("EliminarEmp",{parametro:parametro});
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
          { field: 'sucursal', name: 'sucursal', width: 120
          ,enableFiltering: false
        },
        { field: 'Modificar', name: 'Modificar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Modificar" ng-click="grid.appScope.IrModificar(row.entity)">'},
        { field: 'Eliminar', name: 'Eliminar', enableFiltering: false , width: 120, cellTemplate:'<input type="button"  value="Eliminar" ng-click="grid.appScope.IrEliminar(row.entity)">'},
        


      ];
    };
  })
