(function () {
    'use strict';

    angular.module('book')
        .controller('AppCtrl', appCtrlFunc);

    function appCtrlFunc($scope, BookService) {
        BookService.getBook()
            .success(function (res) {
                $scope.title = res.title;
            });
    }

    appCtrlFunc.$inject = ['$scope', 'BookService'];
})();