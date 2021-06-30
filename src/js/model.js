export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  // this function only changes the state object (DN return anything)
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=6ff36859-c745-4afa-abe5-d1acdd55cf65`
    );
    if (!res.ok) throw new Error('food cannot be found in our database'); // custom error msg
    let parsedRes = await res.json();
    console.log(parsedRes);
    // Reformat the info captured from our fetch request so the names are simpler
    const { recipe } = parsedRes.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err){alert(err)}
};