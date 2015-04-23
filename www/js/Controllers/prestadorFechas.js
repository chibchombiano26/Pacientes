angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams,  pushFactory, emailFactory) {
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    var prestador = $stateParams.prestadorId;
	
    $scope.listado =[];
    $scope.datosCita = {};  
    

    $scope.solicitarCita = function(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();
        var platformPush = pushFactory.getPlatform();

        var data = {
            prestador : item.username,
            platform : platformPush,
            PartitionKey : item.username,
            RowKey: usuario.username,
            solicitadaPor : usuario.username,
            nombreTabla: 'TmCitas',
            fecha : $scope.datosCita.fecha
        }

        var textoCita = 'Nueva cita solicitada';
        pushFactory.enviarMensajePlatform(item.email,textoCita, item.platform);
        emailFactory.enviarEmail(usuario.email, item.email, 'Cita solicitada', textoCita, textoCita);
        dataTableStorageFactory.saveStorage(data);
    }
}])