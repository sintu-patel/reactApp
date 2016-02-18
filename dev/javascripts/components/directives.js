/**
 *	Directive to load data on initial page load
 **/
ebookApp.directive('loadebook', function() {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			$scope.totalPage = parseInt(attrs.totalpages, 10);
			$scope.pageno = $scope.totalPage + 1;
			$scope.ebookData();
		}
	};
});
