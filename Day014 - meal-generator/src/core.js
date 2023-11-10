function onPageReady(fn) {
    window.addEventListener('load', () => fn());
}

onPageReady(() => {
    const generateMealButton = document.getElementById('get-meal');
    const mealContainer = document.getElementById('meal');
    generateMealButton.addEventListener('click', () => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => showMeal(res.meals[0]))
    });

    const showMeal = (meal) => {
        const ingredients = [];
        // Get all ingredients 1 to 20
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            } else {
                break;
            }
        }

        mealContainer.innerHTML = `
		<div class="grid grid-cols-2 gap-4 mt-5">
			<div>
				<img src="${meal.strMealThumb}" alt="Meal Image" class="max-w-full object-cover">
				
				<h5 class="text-3xl text-gray-900 font-bold">Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div>
				<h4 class="font-bold text-2xl mb-6 text-gray-900">${meal.strMeal}</h4>
				${meal.strCategory ? `<p class="mb-3"><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p class="mb-3"><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p class="mb-3"><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<p class="mb-3">${meal.strInstructions}</p>
			</div>
			${meal.strYoutube ? `
		    <div class="row">
			    <h5 class="font-bold text-2xl my-6 text-gray-900">Video Recipe</h5>
			    <div class="videoWrapper">
				    <iframe width="420" height="315"
				    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				    </iframe>
			    </div>
		    </div>` : ''}
		</div>
		
	`;
    }


});