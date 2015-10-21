angular.module('socialchef.services', [])

.factory('spoonacularService', function($http) {
	return {
		searchRecipes: function(searchTerms) {
			return $http({
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
		},
		getRecipe: function(recipeID) {
			return $http({
				url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/information",
				method: "GET",
				headers: {
			        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
			    },
			})
		},
		getRecipeInstructions: function(recipeURL) {
			return $http({
				url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract",
				method: "GET",
				params: {
					"forceExtraction": "false",
			        "url": recipeURL,
				},
				headers: {
			        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
			    },
			})
		},
		getSummary: function(recipeID) {
			return $http({
				url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/summary",
				method: "GET",
				headers: {
					"X-Mashape-Key": "vCDVQHBGVnmshCYR0nAs2N9Ibaixp1FHLNljsn9lD7ZxzJe2B3",
				},
			})
		},
	}
})