// Gets recipes after user performs search
function getRecipes(searchTerms) {
	$.ajax({
	    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
	    type: "GET",
	    data: {
	        "ingredients": searchTerms,
	        "number": "30",
	    },
	    headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	        "Accept": "application/json",
	    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	    displayRecipes(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    // console.log('getRecipes called')
	});
}

function displayRecipes(response) {
	$('#search-results').empty();
	var recipes = response;
	recipes.forEach( function(recipe) {
		// console.log(recipe);
		// display each recipe
		var totalIngredients = recipe.missedIngredientCount + recipe.usedIngredientCount
		var html = "<div class='list card'>" +
					"<a href='#/app/recipes/" + recipe.id + "' class='item item-avatar'>" + 
						"<img src=" + recipe.image + ">" +
						"<h2>" + recipe.title + "</h2>" +
						"<p>Total ingredients: " + totalIngredients + "</p>" +
					"</a>" +
				"</div>";
		$('#search-results').append(html);
	});
}

function getRecipe(recipeID, $scope) {
	$.ajax({
	    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/information",
	    type: "GET",
	    headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("getRecipe HTTP Request Succeeded: " + jqXHR.status);
	    // console.log(data);
	    var recipe = new Recipe(data);
	    var recipeURL = data.sourceUrl;
	    extractRecipeInstructions(recipeURL, recipe, $scope);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    // console.log('getRecipe called')
	});
}

function extractRecipeInstructions(recipeURL, recipe, $scope) {
	$.ajax({
	    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract",
	    type: "GET",
	    data: {
	        "forceExtraction": "false",
	        "url": recipeURL,
	    },
	    headers: {
	        "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
	    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("extractRecipeInstructions HTTP Request Succeeded: " + jqXHR.status);
	    // console.log(data);
	    recipe.addRecipeInstructions(data);
	    $scope.recipe = recipe;
	    console.log(recipe);
	    displayRecipe(recipe);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    // console.log('extractRecipeInstructions called')
	});
}

function displayRecipe(recipe) {
	$('#recipe-details').empty();
	var html = "<h2 class='skinny-header center'>" + recipe.name + "</h2>" +
			"<div class='list card'>" +
				// "<div class='item'>" +
				// 	"<h2 class='skinny-header'>" + recipe.name + "</h2>" +
				// "</div>" +
				"<div class='item item-image'>" + 
					"<img src=https://spoonacular.com/recipeImages/" + recipe.image + ">" +
				"</div>" +
				"<div href='#/app/recipes/" + recipe.id + "' class='item item-avatar'>" + 
					"<img src='img/meal-cooked.png'>" +
					"<h2>Total ingredients: " + recipe.ingredients.length + "</h2>" +
					"<p>Cook time: " + recipe.time + " minutes</p>" +
				"</div>" +
			"</div>";
	$('#recipe-details').append(html);
	$('#recipe-instructions').append(recipe.instructionsHTML);
}