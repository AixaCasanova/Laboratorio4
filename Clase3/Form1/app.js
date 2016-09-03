var app = angular.module('ABMangularPHP', []); //crea una variable pero el obj a crear es un modulo a crear y el paramentro a recibir es el nombre del modulo


app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**casanova**";
  $scope.OtroDato="**otro dato**";
    console.log("estoy en la grilla");

});