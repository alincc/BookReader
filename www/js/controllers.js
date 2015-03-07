angular.module('book.controllers', [])

    .controller('AppCtrl', function ($scope) {
    })

    .controller('IndexCtrl', function ($scope, BookService) {
        BookService.readIndex()
            .success(function (res) {
                $scope.chapters = res.chapters;
            });
    })

    .controller('ChapterCtrl', function ($scope, $stateParams, BookService) {
        BookService.readChapter($stateParams.chapterId)
            .success(function (res) {
                $scope.chapter = res;
            });
    })
