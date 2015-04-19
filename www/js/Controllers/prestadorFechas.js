angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', '$cordovaDatePicker',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams, $cordovaDatePicker) {
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    var prestador = $stateParams.prestadorId;
	
    $scope.listado =[];
    $scope.datosCita = {};

    var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

    $scope.$on('$ionicView.afterEnter', function(){
        
         $cordovaDatePicker.show(options).then(function(date){
            $scope.datosCita.fecha = date;
            console.log(date);
        });

    });
    

    $scope.solicitarCita = function(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();

        var data = {
            prestador : item.username,
            PartitionKey : item.username,
            RowKey: usuario.username,
            solicitadaPor : usuario.username,
            nombreTabla: 'TmCitas',
            fecha : $scope.datosCita.fecha            
        }

        dataTableStorageFactory.saveStorage(data);
    }
}])