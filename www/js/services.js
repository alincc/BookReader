angular.module('book.services', [])

    .factory('BookService', ['$http', function ($http) {
        var r = {};

        var url = "";
        if (ionic.Platform.isAndroid()) {
            url = "/android_asset/www/data/";
        }
        //url = "/data/";

        r.readChapter = function (chapterFile) {
            return $http.get(url + chapterFile);
        }

        r.readIndex = function (chapterFile) {
            return $http.get(url + 'book.json');
        }

        return r;

    }]);