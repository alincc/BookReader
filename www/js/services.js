angular.module('book.services', [])

    .factory('BookService', ['$http', function ($http) {
        var r;

        var url = "";
        if(ionic.Platform.isAndroid()){
            url = "/android_asset/www/";
        }

        r.readChapter = function(chapterFile)
        {
            return $http.get(url + chapterFile);
        }

        return r;

    }]);