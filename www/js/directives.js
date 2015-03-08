angular.module('book.directives', [])

    .directive('chapter', [
        '$ionicGesture', '$timeout', '$window', '$state',
        function ($ionicGesture, $timeout, $window, $state) {

            var d = {};

            d.scope = {
                content: '@'
            };

            d.replace = true;

            d.template = '<div>' +
            '<div class="content" ng-style="getStyle()" ng-bind-html="content"></div>' +
            '<div class="pageNo">Page {{currentPage}}/{{totalPages}}</div>' +
            '</div>';

            d.link = function (scope, el) {
                var element = el[0];
                var contentEl = element.children[0];
                var viewPortHeight, viewPortWidth, totalHeight, totalWidth, topPosition;
                var oldViewPortHeight, oldViewPortWidth;

                var init = function () {
                    viewPortHeight = oldViewPortHeight = element.clientHeight - 90;
                    viewPortWidth = oldViewPortWidth = element.clientWidth;
                    totalWidth = viewPortWidth;
                    totalHeight = 0;

                    updatePages();
                };

                var updatePages = function () {
                    scope.currentPage = Math.round(Math.abs(topPosition) / viewPortHeight) + 1;
                    scope.totalPages = Math.ceil(totalHeight / viewPortHeight);
                }

                init();

                $window.addEventListener('resize', function () {
                    console.debug('resize');
                    //init();
                    updatePages();
                    scope.$apply();
                });

                scope.getStyle = function () {
                    return {
                        "top": topPosition + "px"
                    };
                }

                scope.$watchCollection(function () {
                    return [element.clientHeight, element.clientWidth]
                }, function (value, prevValue) {
                    if (angular.equals(value, prevValue)) return;
                    console.debug('element.clientHeight, element.clientWidth', value);

                    viewPortHeight = value[0] - 90;
                    viewPortWidth = value[1];

                    updatePages();
                });

                // Verify client height
                scope.$watchCollection(function () {
                    return [contentEl.clientHeight, contentEl.clientWidth]
                }, function (value, prevValue) {
                    if (angular.equals(value, prevValue)) return;

                    console.debug('contentEl.clientHeight, contentEl.clientWidth', value);
                    totalHeight = value[0];
                    totalWidth = value[1];

                    updatePages();
                });

                // On content change
                scope.$watch('content', function (value, prevValue) {
                    if (angular.equals(value, prevValue)) return;

                    console.debug('content changed')
                    topPosition = 0;
                    updatePages();
                });

                var tapHandle = function (event) {
                    var pos = event.gesture.center;
                    console.debug('pos', pos);
                    // If on first half of page, its a left direction
                    if (pos.pageX < totalWidth / 2) {
                        if (topPosition + viewPortHeight < viewPortHeight) {
                            topPosition = topPosition + viewPortHeight;
                        }
                    }
                    // otherwise its a right direction, check limit
                    else if (topPosition + totalHeight > viewPortHeight) {
                        topPosition = topPosition - viewPortHeight;
                    }

                    updatePages();
                    scope.$apply();
                };

                var tapGesture = $ionicGesture.on('tap', tapHandle, el);

                scope.$on('$destroy', function () {
                    $ionicGesture.off(tapGesture, 'tap', tapHandle);
                })
            }

            return d;

        }]);