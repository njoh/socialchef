angular.module('socialchef.controllers', [])

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

	$scope.date = new Date();
	$scope.mealsCooked = [];
	// $scope.mealsCooked = new MealsCooked();

	$scope.mealsCookedThisWeek = $scope.mealsCooked.getMealsForCurrentWeek();

	$scope.updateMealsCookedThisWeek = function() {
		$scope.mealsCookedThisWeek = $scope.mealsCooked.getMealsForCurrentWeek();
	}

	$scope.addRecipeToMealsCooked = function(recipe) {
		$scope.mealsCooked.addRecipe(recipe);
		$scope.updateMealsCookedThisWeek();
		// $scope.mealsCooked.push({ name: name, spoonacularID: spoonacularID, date: new Date()});
		// console.log($scope.mealsCooked);
	}

	// $scope.addQuickMealToMealsCooked = function() {
	// 	$scope.mealsCooked.addQuickMeal();
	// }
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

	$scope.makeQuickMeal = function() {
		// $scope.addMeal('Quick Meal', 'none');
		// $scope.cookModal.hide();
		$scope.mealsCooked.addQuickMeal();
		$scope.updateMealsCookedThisWeek();
		// $scope.mealsCooked.getMealsForCurrentWeek();
		$('#cook-buttons').hide();
	}

	// $scope.mealsCooked.getMealsForCurrentWeek();

})

.controller('SearchCtrl', function($scope, $http) {
	$scope.recipes = 'asfds';
	$scope.search = function(keyEvent) {
		if (keyEvent.which === 13) {
			// getRecipes(this.searchTerm);
			searchRecipesFromSpoonacular(this.searchTerm, $scope, $http);
		}
	}
})

.directive('searchResults', function() {
	return {
	    templateUrl: 'templates/search_results.html'
	};
})

.controller('RecipeCtrl', function($scope, $stateParams, $http) {
	var recipeId = $stateParams.recipeId;
	// getRecipe(recipeId, $scope);
	getRecipeFromSpoonacular(recipeId, $scope, $http);
	
	$scope.makeRecipe = function() {
		// $scope.addMeal($scope.recipe.name, $scope.recipe.id);
		$scope.addRecipeToMealsCooked($scope.recipe);
		alert('Adding recipe to meals cooked today!');
	}
})

.directive('recipeDetails', function() {
	return {
	    templateUrl: 'templates/recipe_details.html'
	};
})

.directive('recipeInstructions', function() {
	return {
	    templateUrl: 'templates/recipe_instructions.html'
	};
})

.controller('HistoryCtrl', function($scope) {
})

.controller('BadgesCtrl', function($scope) {
	$scope.badges = [
		{ title: 'Ratatouille Award', 		id: 1, 	date: 'today' },
		{ title: 'Master Chef Award', 		id: 2,	date: 'tomorrow' }
	];
})
;
