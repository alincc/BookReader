angular.module('book.directives', [])

    .directive('chapter', ['$ionicGesture', '$timeout', function ($ionicGesture, $timeout) {

        var d = {};

        d.scope = {
            content: '@'
        };

        d.template = '<div><div class="content" ng-style="{\'top\':topPosition + \'px\'}" ng-bind-html="content"></div>' +
        '<div class="pageNo">Page {{currentPage}}/{{totalPages}}</div>' +
        '</div>'

        d.link = function (scope, el) {

            var element = el[0];
            var contentEl = el[0].children[0];
            var viewPortHeight = element.clientHeight - 80;
            var viewPortWidth = element.clientWidth;
            var totalHeight = 0;
            var totalWidth = viewPortWidth;

            // Verify client height
            scope.$watch(function () {
                return contentEl.clientHeight
            }, function (value) {
                if (value > 0) {
                    totalHeight = value;
                    scope.totalPages = Math.ceil(totalHeight / viewPortHeight);
                }
            });

            // On content change
            scope.$watch('content', function(){
                console.log('content changed')
                console.debug('ddd: content changed')
                scope.currentPage = 1;
                scope.topPosition = 0;
                $timeout(function(){
                    scope.$apply();
                });
            });

            var tapHandle = function (event) {
                var pos = event.gesture.center;
                // If on first half of page, its a left direction
                if (pos.pageX < totalWidth / 2) {
                    if (scope.topPosition + viewPortHeight < viewPortHeight) {
                        scope.topPosition = scope.topPosition + viewPortHeight;
                    }
                }
                // otherwise its a right direction, check limit
                else if (scope.topPosition + totalHeight > viewPortHeight) {
                    scope.topPosition = scope.topPosition - viewPortHeight;
                }

                scope.currentPage = Math.round(Math.abs(scope.topPosition) / viewPortHeight) + 1;
                scope.$apply();
            }

            var tapGesture = $ionicGesture.on('tap', tapHandle, el);

            scope.$on('$destroy', function () {
                $ionicGesture.off(tapGesture, 'tap', tapHandle);
            })
        }

        return d;

    }]);