(function () {
    'use strict';

    angular.module('book')
        .factory('BookService', bookService);

    bookService.$inject = ['$http', '$location'];

    function bookService($http, $location) {
        var r = {};

        var url = "";

        if (ionic.Platform.isAndroid()) {
            url = "/android_asset/www/data/";
        }

        if ($location.$$host == '192.168.0.6') {
            url = "/data/";
        }

        r.readChapter = function (chapterFile) {
            return $http.get(url + chapterFile);
        }

        r.getBook = function (chapterFile) {
            return $http.get(url + 'book.json');
        }

        return r;
    }
})();


