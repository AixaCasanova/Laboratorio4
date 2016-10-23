angular.module('app')
  .filter('sexo', function () {
  	var sexo = {
  		Male: 'Masculino', //cambiar a male o female
  		Female: 'Femenino'
  	}
    return function (input) {
    	if (!input)
    		return '';
      return sexo[input];
    };
  });
