angular.module('socialchef.controllers', ['socialchef.services'])

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

	// Keep Cooking Modal
	// Create the keep cooking modal that we will use later
	$ionicModal.fromTemplateUrl('templates/keep_cooking_modal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.keepCookingModal = modal;
	});

	// Triggered in the keep cooking today modal to close it
	$scope.closeKeepCooking = function() {
		$scope.keepCookingModal.hide();
	};

	// Triggered when meal added
	$scope.openKeepCooking = function() {
		$scope.keepCookingModal.show();
	};

	// Other stuff:
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

	$scope.getAverageMealCalories = function() {
		$scope.updateMealsCookedThisWeek();
		var mealLength = $scope.mealsCookedThisWeek.length;
		var totalCalories = 0;
		for (var i = 0; i < mealLength; i++){
			totalCalories = totalCalories + $scope.mealsCookedThisWeek[i].recipe.calories;
		}
		var averageCalories = totalCalories/mealLength;

		if (isNaN(averageCalories)){
			return 0;
		}
		else {
			return averageCalories;
		}
	}

	$scope.getAverageMealCost = function() {
		$scope.updateMealsCookedThisWeek();
		var mealLength = $scope.mealsCookedThisWeek.length;
		var totalCost = 0;
		for (var i = 0; i < mealLength; i++){
			totalCost = totalCost + $scope.mealsCookedThisWeek[i].recipe.cost;
		}
		var averageCost = totalCost/mealLength;
		if (isNaN(averageCost)){
			return 0;
		}
		else {
			return averageCost;
		}
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
		$scope.openKeepCooking();
		// $scope.mealsCooked.getMealsForCurrentWeek();
		$('#cook-buttons').hide();
	}

	// $scope.mealsCooked.getMealsForCurrentWeek();

})

.controller('SearchCtrl', function($scope, spoonacularService) {
	$scope.search = function(keyEvent) {
		if (keyEvent.which === 13) {
			doSearch(this.searchTerm);
		}
	}

	function doSearch(searchTerm) {
		spoonacularService.searchRecipes(searchTerm).then( function success(response) { 
			console.log(response);
			$scope.recipeSearchResults = response.data;
		}, function error(response) {
			console.log(response);
		});
	}
})

.controller('RecipeCtrl', function($scope, $stateParams, spoonacularService) {
	var recipeID = $stateParams.recipeId;
	getRecipeFromSpoonacular(recipeID);
	
	$scope.makeRecipe = function() {
		// $scope.addMeal($scope.recipe.name, $scope.recipe.id);
		$scope.addRecipeToMealsCooked($scope.recipe);
		$scope.openKeepCooking();
		// alert('Adding recipe to meals cooked today!');
	}

	function getRecipeFromSpoonacular(recipeID) {
		spoonacularService.getRecipe(recipeID).then( function success(response) {
			// console.log(response);
			var recipe = new Recipe(response.data);
			$scope.recipe = recipe;
			// Have to get recipe instructions in a seperate call
			getRecipeInstructionsFromSpoonacular();
			getRecipeSummaryFromSpoonacular();
			// getRecipeCostFromSpoonacular();
			// getRecipeCalorieCountFromSpoonacular();
		}, function error(response) {
			console.log(response);
		})
	}

	function getRecipeInstructionsFromSpoonacular() {
		spoonacularService.getRecipeInstructions($scope.recipe.sourceURL).then( function success(response) {
			// console.log(response);
			$scope.recipe.addRecipeInstructions(response.data);
		}, function error(response) {
			console.log(response);
		})
	}

	// function getRecipeCostFromSpoonacular() {
	// 	var ingredients = $scope.recipe.ingredients;
	// 	$scope.recipe.addRecipeCost('10');
	// }

	// function getRecipeCalorieCountFromSpoonacular() {
	// 	var ingredients = $scope.recipe.ingredients;
	// 	$scope.recipe.addRecipeCalorieCount('500');
	// }

	function getRecipeSummaryFromSpoonacular() {
		spoonacularService.getSummary($scope.recipe.id).then( function success(response) {
			var summary = response.data;
			var cost = extractRecipeCost(summary);
			$scope.recipe.addRecipeCost(cost);
			var cals = extractRecipeCalories(summary);
			$scope.recipe.addRecipeCalorieCount(cals);
		}, function error(response){
			console.log(response);
		})
	}

	function extractRecipeCalories(spoonacularSummary) {
		var summary = spoonacularSummary.summary;
		var summaryCalories = summary.match(/\d+\s\bcalories\b/);
		var summaryCaloriesLength = summaryCalories[0].length;
		var stringCalories = 0;
		if (summaryCaloriesLength == 11) {
			stringCalories = summaryCalories[0].substring(0, 2);
		}
		else if (summaryCaloriesLength == 12) {
			stringCalories = summaryCalories[0].substring(0, 3);
		}
		else {
			stringCalories = summaryCalories[0].substring(0, 4);
		}
		var calories = Number(stringCalories);
		return calories;
	}

	function extractRecipeCost(spoonacularSummary) {
		var summary = spoonacularSummary.summary;
		var summaryCost = summary.match(/\$\d+\.\d{2}/);
		var stringCost = summaryCost[0].substring(1);
		var cost = Number(stringCost);
		return cost;
	}

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

