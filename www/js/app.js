angular.module('book', ['ionic', 'book.controllers', 'book.services', 'book.directives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            ionic.Platform.fullScreen();

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            window.plugins.insomnia.keepAwake();
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.chapters', {
                url: "/chapters",
                views: {
                    'menuContent': {
                        templateUrl: "templates/index.html",
                        controller: 'IndexCtrl'
                    }
                }
            })

            .state('app.chapter', {
                url: "/chapters/:chapterId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chapter.html",
                        controller: 'ChapterCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/chapters');

    });
