ebookApp.filter('dataAsHtml', ['$sce', function($sce) {
	return function(dataAsHtml) {
		if (!dataAsHtml) {
			return;
		}
		return $sce.trustAsHtml(dataAsHtml);
	};
}]);

