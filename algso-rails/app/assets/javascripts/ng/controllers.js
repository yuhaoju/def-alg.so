var algsoCtrls = angular.module('algsoCtrls', []);

algsoCtrls.controller('loginCtrl', function($http,$scope) {
	// Email validation
	var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,3}$/,
		regName = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]$/

	// data
	$scope.userLoginData = {
		email: "",
		password: "",
		remember: false
	}

	$scope.userSignupData = {
		email: "",
		name: "",
		password: "",
		passwordConfirm: ""
	}

	// hint
	$scope.loginHint = {
		email: true,
		password: true
	}
	$scope.signupHint = {
		email: true,
		name: true,
		password: true,
		passwordConfirm: true
	}

	// submit enable
	$scope.enableLogin = false;
	$scope.enableSignup = false;

	// data change trigger
	$scope.checkEnableLogin = function() {
		var loginHint = $scope.loginHint

		loginHint.email = regEmail.test($scope.userLoginData.email)
		loginHint.password = $scope.userLoginData.password.length >= 6

		if (loginHint.email && loginHint.password) {
			$scope.enableLogin = true
		} else {
			$scope.enableLogin = false
		}

		if (!$scope.$$phase) {
			$scope.$apply()
		}
	}

	$scope.checkEnableSignup = function() {
		var signupHint = $scope.signupHint

		signupHint.email = regEmail.test($scope.userSignupData.email)
		signupHint.name = $scope.userSignupData.name.length >= 2
		signupHint.password = $scope.userSignupData.password.length >= 6
		signupHint.passwordConfirm = $scope.userSignupData.passwordConfirm === $scope.userSignupData.password

		if (signupHint.email && signupHint.name && signupHint.password && signupHint.passwordConfirm) {
			$scope.enableSignup = true
		} else {
			$scope.enableSignup = false
		}

		if (!$scope.$$phase) {
			$scope.$apply()
		}
	}

	// focus
	$scope.focusIn = ''
	$scope.inputFocus = function(e) {
		$scope.focusIn = e.target.name
	}
	$scope.inputBlur = function() {
		$scope.focusIn = ""
	}

	// form link
	$scope.formLink = 'login'
	$scope.linkTo = function(link) {
		$scope.formLink = link
	}

	// login/signup submit
	$scope.loginSubmit = function() {
		// 组织数据
		var reqData = angular.copy($scope.userLoginData)

		// 上传
		$http({
			url: "http://" + location.host + '/login',
			data: reqData,
			method: "POST"
		}).success(function(data) {
			if(data.req === "succeed"){
				location.href = "/user/" + data.name_id
			}
		})
	}

	ReserveCtrlReady($scope)
})

// document ready
function ReserveCtrlReady($scope) {
	angular.element(document).ready(function() {
		// 等待浏览器自动填充之后对填充数据进行校验
		setTimeout(function() {
			$scope.checkEnableLogin()
		}, 200)
	});
}