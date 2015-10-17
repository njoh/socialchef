angular.module('socialchef.directives', [])

.directive('searchResults', function() {
	return {
	    templateUrl: 'templates/search_results.html'
	};
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

.directive('tabsMenu', function() {
	return {
	    templateUrl: 'templates/tabs.html'
	};
})