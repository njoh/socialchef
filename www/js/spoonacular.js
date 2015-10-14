function searchRecipesFromSpoonacular(searchTerms, $scope, $http) {
	$http({
	    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
	    method: "GET",
	    params: {
	        "ingredients": searchTerms,
	        "number": "30",
	    },
	    headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	        "Accept": "application/json",
	    },
	})
	.then( function success(response) { 
		// console.log(response);
		$scope.recipeSearchResults = response.data;
	}, function error(response) {
		console.log(response);
	});
}

function getRecipeFromSpoonacular(recipeID, $scope, $http) {
	$http({
		url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/information",
		method: "GET",
		headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	    },
	})
	.then( function success(response) {
		// console.log(response);
		var recipe = new Recipe(response.data);
		$scope.recipe = recipe;
		getRecipeInstructionsFromSpoonacular(recipe, $scope, $http);
	}, function error(response) {
		console.log(response);
	})
}

function getRecipeInstructionsFromSpoonacular(recipe, $scope, $http) {
	$http({
		url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract",
		method: "GET",
		params: {
			"forceExtraction": "false",
	        "url": recipe.sourceURL,
		},
		headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	    },
	})
	.then( function success(response) {
		// console.log(response);
		recipe.addRecipeInstructions(response.data);
		$scope.recipe = recipe;
		console.log($scope.recipe);
	}, function error(response) {
		console.log(response);
	})
}