/*
 .directive('page-horizontal', ['$window', '$document', '$ionicGesture', function ($window, $document, $ionicGesture) {
 var d = {};

 d.scope = {
 content: '@',
 };

 d.replace = true;

 d.template = '<div ng-bind-html="content"></div>';

 d.link = function (scope, el, attr) {
 var pageWidth, currentPage = 0, pagesCount = 0;
 var d = el[0];

 scope.info = {};

 $window.addEventListener('resize', function () {
 console.debug('resize');
 calculateSizes();
 scope.$apply();
 });

 scope.$watch('content', function () {
 calculateSizes();
 });

 $ionicGesture.on('tap', function () {
 var pageX = event.gesture.center.pageX;
 var leftSide = pageX < window.innerHeight / 2;

 // Check direction
 if (leftSide) {
 currentPage = setPage(currentPage - 1);
 }
 else {
 currentPage = setPage(currentPage + 1);
 }
 }, el.parent());

 $ionicGesture.on('swipe-left', function () {
 currentPage = setPage(currentPage - 1);
 }, el.parent());

 $ionicGesture.on('swipe-right', function () {
 console.log('sr')
 currentPage = setPage(currentPage + 1);
 }, el.parent());

 var setPage = function (pageIndex) {
 // Validate page
 if (pageIndex < 0) {
 pageIndex = 0;
 }
 else if (pageIndex > pagesCount) {
 pageIndex = pagesCount;
 }

 var position = -1 * ((pageWidth + 4) * pageIndex);
 d.style['-webkit-transform'] = 'translate(' + position + 'px, 0px)';
 d.style['-webkit-transition'] = 'all .5s ease-out';

 scope.info.currentPage = pageIndex;
 return pageIndex;
 }

 var calculateSizes = function () {
 pagesCount = Math.ceil(d.offsetHeight / window.innerHeight) + 1;
 scope.info.pagesCount = pagesCount;

 setTimeout(function () {
 pageWidth = window.innerWidth;
 console.log(pageWidth);
 d.style.color = 'inherit';
 d.style.height = d.innerHeight + 'px';
 d.style.width =  (pageWidth * (pagesCount +1)) + 'px';
 d.style.margin = 0;
 d.style.webkitColumnGap = '40px';
 d.style.webkitColumnCount = pagesCount + 1;
 d.style.webkitColumnWidth = (pageWidth - 40) + 'px';

 }, 1000);
 }
 };

 return d;
 }])
 */
