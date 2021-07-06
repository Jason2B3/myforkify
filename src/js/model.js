import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: "", // what the user searched
    results: [],
  },
};

export const loadSearchResults = async function (searchFieldInput) {
  // MAIN OBJECTIVE: Change state object with your search results
  try {
    state.search.query= searchFieldInput //$ update state obj
    // Scan API for your search query
    // fetchAPI returns an array of objects containing ID's recipe titles, images...etc
    const searchResults = await getJSON(
      `https://forkify-api.herokuapp.com/api/search?q=${searchFieldInput}`
    );
    const { recipes } = searchResults;
    const reformattedResults= recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
    state.search.results= reformattedResults //$ update state obj
  } catch (err) {
    throw err;
    // want to handle errors in the controller catch block using view methods
  }
};


export const loadRecipe = async function (id) {
  // this function only changes the state object (DN return anything)
  try {
    // Store resolved fetchAPI promise value from getJSON() into "data"
    const data = await getJSON(`${API_URL}/${id}`);
    // Reformat the info captured from our fetch request so the names are simpler
    const { recipe } = data.data;
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
  } catch (err) {
    throw err;
    //@ ERROR HANDLING PART 1
    // PASSES REJECTED PROMISE TO THE OTHER ASYNC FUNCTION THAT USES loadRecipe()
  }
};



