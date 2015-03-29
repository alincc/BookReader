angular.module('book.controllers', [])

    .controller('AppCtrl', function ($scope, $state, $window, BookService) {
        BookService.getBook()
            .success(function(res){
                $scope.title = res.title;
            });
    })

    .controller('IndexCtrl', function ($scope, BookService) {
        BookService.getBook()
            .success(function (res) {
                $scope.chapters = res.chapters;
            });
    })

    .controller('ChapterCtrl', function ($scope, $stateParams, BookService, $ionicSlideBoxDelegate) {
        BookService.readChapter($stateParams.chapterId)
            .success(function (res) {
                $scope.chapter = res;
            });
    })
