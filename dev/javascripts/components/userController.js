ebookApp.controller('userController', function($scope, $http, $sce) {

	$scope.registeruser = function() {

		if ($scope.name && $scope.username && $scope.password && $scope.email && $scope.phonenumber && $scope.cityname) {
			$scope.userData = {
				'name': $scope.name,
				'username': $scope.username,
				'password': $scope.password,
				'email': $scope.email,
				'phonenumber': $scope.phonenumber,
				'cityname': $scope.cityname
			};

			$scope.postData();
			$scope.username = '';
		}

		else {
			alert('Fill all the fields');
		}
	};

	$scope.postData = function() {
		var serviceUrl = '/registeruser';
		var request = $http({
			method: 'post',
			url: serviceUrl,
			data: $scope.userData
		});

		request.success(function(response) {
			if (response.STATUS === 'ok') {
				alert('Records updated successfully');
			}
		});
	};


	$scope.login = function() {
		$scope.loginData = {
			'username': $scope.loginuser,
			'password': $scope.loginpassword
		};

		$scope.postLoginData();
	};

	$scope.postLoginData = function() {
		var serviceUrl = '/validatelogin';
		var request = $http({
			method: 'post',
			url: serviceUrl,
			data: $scope.loginData
		});

		request.success(function(response) {
			if (response.STATUS === 'ok') {
				window.location.href = response.redirectURL;
			}

			if (response.STATUS === 'invalid') {
				alert('invalid');
			}
		});
	};

	$scope.invalidPassword = false;
	$scope.validatePassword = function () {
		if ($scope.password !== $scope.confirmpassword) {
			$scope.invalidPassword = true;
			$scope.password = '';
			$scope.confirmpassword = '';
		}

		else {
			$scope.invalidPassword = false;
		}
	};

	$scope.invalidUserName = false;
	$scope.validateUserName = function () {
		var username = { 'username': $scope.username };
		var serviceUrl = '/validateusername';
		var request = $http({
			method: 'post',
			url: serviceUrl,
			data: username
		});

		request.success(function(response) {
			if (response.STATUS === 'valid') {
				$scope.invalidUserName = true;
			}

			if (response.STATUS === 'invalid') {
				$scope.invalidUserName = false;
			}
		});
	};

});
