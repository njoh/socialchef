angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};

	$scope.saved_recipes = [
		{ title: 'Cookies', 	id: 1, 	date: 'today' },
		{ title: 'Pizza', 		id: 2,	date: 'tomorrow' },
		{ title: 'PB&J', 		id: 3,	date: 'friday' },
		{ title: 'Brownies', 	id: 4,	date: 'friday' }
	];

	$scope.getRecipe = function(recipeId) {
		var recipes = $scope.saved_recipes
		for (i in recipes) {
			var recipe = recipes[i];
			if (recipeId == recipe.id) {
				return recipe
			}
		}
		return { title: 'None', id: 1, 	date: 'today' }
	}

	$scope.mealsCooked = [];

	$scope.addMeal = function(name, yummlyID) {
		$scope.mealsCooked.push({ name: name, yummlyID: yummlyID, date: new Date()});
		console.log($scope.mealsCooked);
	}
})

.controller('DashboardCtrl', function($scope, $ionicModal) {

	$('#cook-buttons').hide();

	// Create the cook modal that we will use later
	$ionicModal.fromTemplateUrl('templates/cook.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.cookModal = modal;
	});

	// Triggered in the cook today modal to close it
	$scope.closeCookToday = function() {
		$scope.cookModal.hide();
	};

	// Triggered in the cook today modal to close it
	$scope.hideCookButtons = function() {
		$('#cook-buttons').hide();
	};

	// Open the cook today modal
	$scope.cook = function() {
		// $scope.cookModal.show();
		$('#cook-buttons').show();
	};

	$scope.addQuickMeal = function() {
		$scope.addMeal('Quick Meal', 'none');
		// $scope.cookModal.hide();
		$('#cook-buttons').hide();
	}
})

.controller('SearchCtrl', function($scope) {
	$scope.search = function(keyEvent) {
		if (keyEvent.which === 13) {
			// alert('Perform search ' + this.searchTerm);
			getRecipes(this.searchTerm);
			// $scope.recipes = [
			// 	{ title: 'Cookies', id: 1 },
			// 	{ title: 'Pizza', id: 2 },
			// 	{ title: 'PB&J', id: 3 }
			// ];
			$scope.recipes = $scope.saved_recipes;
		}
	}
})

.controller('RecipeCtrl', function($scope, $stateParams) {
	var recipeId = $stateParams.recipeId;
	getRecipe(recipeId);
	
	$scope.makeRecipe = function() {
		$scope.addMeal('Yummly Recipe', 'recipeId');
		alert('Adding recipe to meals cooked today!');
	}
})

.controller('HistoryCtrl', function($scope) {
	$scope.recipes = [
		{ title: 'Cookies', 	id: 1, 	date: 'today' },
		{ title: 'Pizza', 		id: 2,	date: 'tomorrow' },
		{ title: 'PB&J', 		id: 3,	date: 'friday' }
	];
	// $scope.meals = $scope.mealsCooked;
	// console.log($scope.mealsCooked);
})

.controller('BadgesCtrl', function($scope) {
	$scope.badges = [
		{ title: 'Ratatouille Award', 		id: 1, 	date: 'today' },
		{ title: 'Master Chef Award', 		id: 2,	date: 'tomorrow' }
	];
})

// // Ionic starter app 
// .controller('PlaylistsCtrl', function($scope) {
// 	$scope.playlists = [
// 		{ title: 'Reggae', id: 1 },
// 		{ title: 'Chill', id: 2 },
// 		{ title: 'Dubstep', id: 3 },
// 		{ title: 'Indie', id: 4 },
// 		{ title: 'Rap', id: 5 },
// 		{ title: 'Cowbell', id: 6 }
// 	];
// })

// // Ionic starter app 
// .controller('PlaylistCtrl', function($scope, $stateParams) {
// })
;
