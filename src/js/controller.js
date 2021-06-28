if (module.hot) module.hot.accept();
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
//—————————————————————【】——————————————————————————

const showRecipe = async function () {
  try {
    let recipeID= '5ed6604591c37cdc054bc886'
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}?key=6ff36859-c745-4afa-abe5-d1acdd55cf65`
    );
    if (!res.ok) throw new Error('food cannot be found in our database'); // custom error msg
    let parsedRes = await res.json();
    // Reformat the info captured from our fetch request so the names are simpler
    let {recipe} = parsedRes.data
    recipe= {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    console.log(recipe)
    // DO WHAT YOU WANT WITH YOUR SUCCESSFULLY FETCHED DATA
  } catch (err) {
    console.error(err);
    // ACTIONS TO TAKE AFTER A PROMISE REJECTION WILL VARY
  }
};
showRecipe();

/* 
SHOW LIST OF SEARCH RESULTS: 
let searchID= "shrimp"
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchID}&key=6ff36859-c745-4afa-abe5-d1acdd55cf65`
    );

SHOW DETAILS ABOUT 1 PARTICULAR RECIPE

*/