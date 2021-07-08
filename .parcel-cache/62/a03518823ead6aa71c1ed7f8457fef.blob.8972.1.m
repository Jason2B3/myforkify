var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "loadSearchResults", function () {
  return loadSearchResults;
});
_parcelHelpers.export(exports, "loadRecipe", function () {
  return loadRecipe;
});
require('regenerator-runtime');
var _configJs = require('./config.js');
var _helpersJs = require('./helpers.js');
const state = {
  recipe: {},
  search: {
    query: '',
    // what the user searched
    results: []
  }
};
const loadSearchResults = async function (searchFieldInput) {
  // MAIN OBJECTIVE: Change state object with your search results
  try {
    state.search.query = searchFieldInput;
    // $ update state obj
    // Scan API for your search query
    // fetchAPI returns an array of objects containing ID's recipe titles, images...etc
    const searchResults = await _helpersJs.getJSON(`https://forkify-api.herokuapp.com/api/search?q=${searchFieldInput}`);
    const {recipes} = searchResults;
    const reformattedResults = recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url
      };
    });
    state.search.results = reformattedResults;
  } catch (err) {
    throw err;
  }
};
const loadRecipe = async function (id) {
  // this function only changes the state object (DN return anything)
  try {
    // Store resolved fetchAPI promise value from getJSON() into "data"
    const data = await _helpersJs.getJSON(`${_configJs.API_URL}/${id}`);
    // Reformat the info captured from our fetch request so the names are simpler
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    throw err;
  }
};
