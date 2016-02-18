ebookApp.controller('ebookController', function($scope, $http, $sce) {
	$scope.currentPage = 1;
	$scope.totalPage = 6;

	$scope.ebookData = function() {
		var serviceUrl = '/getpage?pageNo=' + $scope.currentPage;
		$http.get(serviceUrl)
		.success(function(response) {
			if (response[0]) {
				$scope.pageTitle = response[0].pageTitle;
				$scope.pageContent = response[0].content;
				$scope.keyPoints = response[0].keyPoints;
				$scope.progress = (($scope.currentPage / $scope.totalPage) * 100) + '%';
			}

			else {
				$scope.pageContent = 'Your ebook is empty. Please add some page to it. <a href="/addpage"> Click here to add page</a>';
			}
		});
	};

	// Make ajax call and show page data
	$scope.showPage = function($event) {
		if ($event === 'play') {
			$scope.currentPage = 1;
		}

		else if ($event === 'prevPage') {
			$scope.currentPage = $scope.currentPage === 1 ? $scope.totalPage : $scope.currentPage - 1;
		}

		else if ($event === 'nextPage') {
			$scope.currentPage = $scope.currentPage === $scope.totalPage ? 1 : $scope.currentPage + 1;
		}

		else {
			$scope.currentPage = parseInt($event, 10);
		}

		$scope.ebookData();
	};

	// Toggle Menu options
	$scope.menuState = 'hidden';
	$scope.toggleMenu = function() {
		$scope.menuState = $scope.menuState === 'hidden' ? 'visible' : 'hidden';
	};

	$scope.addPage = function(queryType) {
		$scope.editPageNo = $scope.pageno;
		$scope.editTitle = $scope.pagetitle;
		$scope.editcontent = $scope.pagecontent;
		$scope.keyPoints = $scope.keyPoints;

		var pagaDataArr = {
			'queryType': queryType,
			'pageNo': $scope.editPageNo,
			'pageTitle': $scope.editTitle,
			'content': $scope.editcontent,
			'keyPoints': $scope.keyPoints
		};

		$scope.pagaDataArr = pagaDataArr;
		$scope.postData();

	};

	$scope.updatePageNo = function() {
		var pagaDataArr = {
			'oldpagetitle': $scope.oldpagetitle,
			'newpageno': $scope.newpageno
		};

		$scope.pagaNoDataArr = pagaDataArr;
		$scope.postPageNoData();
	};

	$scope.postPageNoData = function() {
		var serviceUrl = '/updatepageno';
		var request = $http({
			method: 'post',
			url: serviceUrl,
			data: $scope.pagaNoDataArr
		});

		request.success(function(response) {
			if (response.STATUS === 'ok') {
				alert('Records updated successfully');
				$scope.oldpagetitle = '';
				$scope.newpageno = '';
			}
		});
	};

	$scope.postData = function() {
		var pageParams = $scope.pagaDataArr;
		var serviceUrl = '/insertdata';
		var request = $http({
			method: 'post',
			url: serviceUrl,
			data: $scope.pagaDataArr
		});

		request.success(function(response) {
			if (response.STATUS === 'ok') {
				alert('Records updated successfully');
				$scope.pageno = parseInt(response.totalCount, 10) + 1;
				$scope.pagetitle = '';
				$scope.pagecontent = '';
				$scope.keyPoints = '';
			}
		});
	};

	$scope.updateForm = function() {
		var serviceUrl = '/getpage?pageNo=' + $scope.pageno;
		$http.get(serviceUrl)
		.success(function(response) {
			if (!response.length) {
				alert('The page ' + $scope.pageno + ' does not exits in database');
				$scope.pagetitle = '';
				$scope.pagecontent = '';
				$scope.keyPoints = '';
				return;
			}

			$scope.pagetitle = response[0].pageTitle;
			$scope.pagecontent = response[0].content;
			$scope.keyPoints = response[0].keyPoints;
		});
	};

	// For Socket IO
	var socket = io.connect();
	socket.on('this', function (data) {
		var activeUsersHtml = '<ul>';
		$.each(data, function(k, v) {
			activeUsersHtml += '<li>';
			activeUsersHtml += v.name;
			activeUsersHtml += '</li>';
		});
		activeUsersHtml += '</ul>';
		$('.active-users').empty().html(activeUsersHtml);
	});
});
