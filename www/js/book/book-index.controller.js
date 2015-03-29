(function () {
    'use strict';

    angular.module('book')
        .controller('IndexCtrl', indexCtrlFunc);

    function indexCtrlFunc($scope, BookService) {

        BookService.getBook()
            .success(function (res) {
                $scope.chapters = res.chapters;
            });

    }

    indexCtrlFunc.$inject = ['$scope', 'BookService'];
})();