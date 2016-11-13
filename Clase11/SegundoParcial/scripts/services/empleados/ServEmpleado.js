angular
  .module('app')
  .factory('ServEmpleado', function (ServEmpleadoBase) {
   
    var objeto = {};
    objeto.nombre = "Factory con servicio de Banderas";
    objeto.TraerEmp = TraerEmp;
    objeto.TraerListaSuc = TraerListaSuc;
    objeto.ModifEmp = ModifEmp;
    objeto.ElimEmp = ElimEmp;
    objeto.AltaEmpleado = AltaEmpleado;
    return objeto;

 
    function TraerEmp(){
       return ServEmpleadoBase.TraerEmp();

    };

    function ModifEmp(empleado){

     return ServEmpleadoBase.ModifEmp(empleado);

    };

    
    function ElimEmp(empleado){

     return ServEmpleadoBase.ElimEmp(empleado);

    };

    function AltaEmpleado(emp)
    {

      return ServEmpleadoBase.AltaEmpleado(emp);
    };

    function TraerListaSuc(){
       return ServEmpleadoBase.TraerListaSuc();

    };



  })//Cierra factory
