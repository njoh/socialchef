// Gets recipes after user performs search
function getIngredients(searchTerms) {
	try {
		$.ajax({
			//Using Spoonacular API
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/parseIngredients',
			type: "POST",
			headers: {
				"X-Mashape-Key": "vCDVQHBGVnmshCYR0nAs2N9Ibaixp1FHLNljsn9lD7ZxzJe2B3",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: {
				"ingredientList": searchTerms,
				"servings": "2",
 			},
			jsonp: false,
			dataType: 'jsonp',
			crossDomain: true
		})
	} catch(e) {
		console.log(e.description);
	}
}

function getPrices(ingredients) {
	try {
		$.ajax({
			//Using Spoonacular API
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizePriceEstimator',
			type: "POST"
			headers: {
				'X-Mashape-Key': 'TRDig4R2cVmshfiwABqlOnFXFXh8p1MtNiQjsnuE81O4t59kmD',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: {
				"defaultCss": "checked",
				"ingredientList": ingredients,
				"mode": "1",
				"servings": "1",
			},
			jsonp: false,
			dataType: 'jsonp',
			crossDomain: true,
		})
	} catch(e) {
		console.log(e.description);
	}

}
