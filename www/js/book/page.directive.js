(function () {
    'use strict';

    angular.module('book')
        .directive('page', pageDirective);

    function pageDirective() {
        var directive = {
            scope: {
                content: '@'
            },
            template: '<div ng-bind-html="content"></div>',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr) {
        }
    }

})();
