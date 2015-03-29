(function () {
    'use strict';

    angular.module('book')
        .controller('ChapterCtrl', chapterCtrlFunc);

    function chapterCtrlFunc($scope, $stateParams, BookService) {
        BookService.readChapter($stateParams.chapterId)
            .success(function (res) {
                $scope.chapter = res;
            })
    }

    chapterCtrlFunc.$inject = ['$scope', '$stateParams', 'BookService']
})();