// Gets recipes after user performs search
function getRecipes(searchTerms) {
	try {
		$.ajax({
			// Using Yummly API: https://developer.yummly.com/
			url: 'http://api.yummly.com/v1/api/recipes?',
			headers: {
				'X-Yummly-App-ID': '363dd85c',  
 				'X-Yummly-App-Key': '2785c2525925d81be5a8d6fb45b6974c'
			},
			data: {
				_app_id: '363dd85c',
 				_app_key: '2785c2525925d81be5a8d6fb45b6974c',
 				q: searchTerms,
 				callback : 'displayRecipes'
 			},
			jsonp: false,
			dataType: 'jsonp',
			crossDomain: true
		})
	} catch(e) {
		console.log(e.description);
	}
}

function displayRecipes(response) {
	$('#search-results').empty();
	var recipes = response.matches;
	recipes.forEach( function(recipe) {
		// console.log(recipe);
		// display each recipe
		var html = "<div class='list card'>" +
					"<a href='#/app/recipes/" + recipe.id + "' class='item item-avatar'>" + 
						"<img src=" + recipe.smallImageUrls[0] + ">" +
						"<h2>" + recipe.recipeName + "</h2>" +
						"<p>Total time to cook: " + recipe.totalTimeInSeconds/60 + " minutes</p>" +
					"</a>" +
				"</div>";
		$('#search-results').append(html);
	});
}

function getRecipe(recipeID) {
	try {
		$.ajax({
			// Using Yummly API: https://developer.yummly.com/
		url: 'http://api.yummly.com/v1/api/recipe/' + recipeID + '?',
		headers: {
			'X-Yummly-App-ID': '363dd85c',  
			'X-Yummly-App-Key': '2785c2525925d81be5a8d6fb45b6974c'
		},
		data: {
			_app_id: '363dd85c',
 			_app_key: '2785c2525925d81be5a8d6fb45b6974c',
 			callback: 'displayRecipe'
		},
		jsonp: false,
		dataType: 'jsonp',
		crossDomain: true,
		})
	} catch(e) {
		console.log(e.description);
	}
}

function displayRecipe(response) {
	$('#recipe-details').empty();
	var recipe = response;
	console.log(recipe);
	var html = "<h2 class='skinny-header center'>" + recipe.name + "</h2>" +
			"<div class='list card'>" +
				// "<div class='item'>" +
				// 	"<h2 class='skinny-header'>" + recipe.name + "</h2>" +
				// "</div>" +
				"<div class='item item-image'>" + 
					"<img src=" + recipe.images[0].hostedLargeUrl + ">" +
				"</div>" +
				"<div href='#/app/recipes/" + recipe.id + "' class='item item-avatar'>" + 
					"<img src='img/ionic.png'>" +
					"<h2>Total ingredients: " + recipe.ingredientLines.length + "</h2>" +
					"<p>Cook time: " + recipe.totalTimeInSeconds/60 + " minutes</p>" +
				"</div>" +
			"</div>";
	$('#recipe-details').append(html);
}