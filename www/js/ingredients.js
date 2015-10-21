//not being used

function getSummary(recipeID) {
	$.ajax({
		//Using Spoonacular API
		url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/summary",
		type: "GET"
		headers: {
			"X-Mashape-Key": "vCDVQHBGVnmshCYR0nAs2N9Ibaixp1FHLNljsn9lD7ZxzJe2B3",
		},
		jsonp: false,
		dataType: 'jsonp',
		crossDomain: true,
	})
	catch(e) {
		console.log(e.description);
	}
}
