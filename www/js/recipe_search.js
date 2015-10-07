// Gets recipes after user performs search
function getRecipes(searchTerms) {
	// value from search field 
	var searchTerms = searchTerms
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
 				callback : 'getRecipeMatches'
 			},
			jsonp: false,
			dataType: 'jsonp',
			crossDomain: true
		})
	} catch(e) {
		console.log(e.description);
	}
}

function getRecipeMatches(response) {
	var recipes = response.matches;
	recipes.forEach( function(recipe) {
		displayRecipe(recipe);
		// var name = recipe.recipeName;
		// $('.list').append('<ion-item class="item item-complex">' + name + '</ion-item>')
	});
}

function displayRecipe(recipe) {
	console.log(recipe);
	var html = "<div class='list card'>" +
				"<div class='item item-avatar'>" + 
					"<img src=" + recipe.smallImageUrls[0] + ">" +
					"<h2>" + recipe.recipeName + "</h2>" +
					"<p>Total time to cook: " + recipe.totalTimeInSeconds/60 + " minutes</p>" +
				"</div>" +
			"</div>";
	$('#search-results').append(html);
}