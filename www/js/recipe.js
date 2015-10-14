function Recipe(spoonacularRecipe) {
	this.id = spoonacularRecipe.id;
	this.name = spoonacularRecipe.title;
	this.image = spoonacularRecipe.image;
	this.ingredients = spoonacularRecipe.extendedIngredients;
	this.servings = spoonacularRecipe.servings;
	this.time = spoonacularRecipe.readyInMinutes;
	this.sourceURL = spoonacularRecipe.sourceUrl;
}

Recipe.prototype.addRecipeInstructions = function(spoonacularInstructions) {
	this.instructionsHTML = spoonacularInstructions.text;
}

// function MealsCooked() {
// 	this = [];
// }

// MealsCooked.prototype.addRecipe = function(recipe) {
// 	var date = new Date();
// 	var name = recipe.name;
// 	var spoonacularID = recipe.id;
// 	this.push({
// 		date: date,
// 		name: name,
// 		spoonacularID: spoonacularID,
// 		recipe: recipe,
// 	})
// }

// MealsCooked.prototype.addQuickMeal = function() {
// 	var date = new Date();
// 	var name = "Quick Meal";
// 	this.push({
// 		date: date,
// 		name: name,
// 	})
// }

Array.prototype.addRecipe = function(recipe) {
	var date = new Date();
	var name = recipe.name;
	var spoonacularID = recipe.id;
	var image = "https://spoonacular.com/recipeImages/" + recipe.image;
	this.push({
		date: date,
		name: name,
		spoonacularID: spoonacularID,
		recipe: recipe,
		image: image,
	});
	this.getMealsForCurrentWeek();
}

Array.prototype.addQuickMeal = function() {
	var date = new Date();
	var name = "Quick Meal";
	var image = "img/meal-cooked.png";
	this.push({
		date: date,
		name: name,
		image: image,
	});
	this.getMealsForCurrentWeek();
}

Array.prototype.getMealsForCurrentWeek = function() {
	// using datejs
	var currentWeek = Date.today().getISOWeek();
	var mealsForWeek = [];
	this.forEach(function(recipe) {
		if (recipe.date.getISOWeek() == currentWeek) {
			mealsForWeek.push(recipe);
		}
	});
	return mealsForWeek;
}