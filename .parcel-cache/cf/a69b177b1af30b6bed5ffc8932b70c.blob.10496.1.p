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
_parcelHelpers.export(exports, "getSearchResultsPage", function () {
  return getSearchResultsPage;
});
_parcelHelpers.export(exports, "addBookmark", function () {
  return addBookmark;
});
require('regenerator-runtime');
var _configJs = require('./config.js');
var _helpersJs = require('./helpers.js');
const state = {
  recipe: {},
  search: {
    query: '',
    // what the user searched
    results: [],
    page: 1,
    // set page number to 1 by default
    resultsPerPage: 10
  },
  bookmarks: []
};
const loadSearchResults = async function (searchFieldInput) {
  // MAIN OBJECTIVE: Change state object with your search results
  try {
    state.search.page = 1;
    // reset page to 1 after every search
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
    const data = await _helpersJs.getJSON(`${_configJs.API_URL}${id}`);
    console.log(`${_configJs.API_URL}${id}`);
    // link to the JSON data
    // console.log('raw parsed JSON incoming');
    // console.log(data);
    // Reformat the info captured from our fetch request so the names are simpler
    const {recipe} = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      // not always there
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    throw err;
  }
};
const getSearchResultsPage = function (page = state.search.page) {
  // Adjust page buttons to a "start at 1" type of count
  // RES_PER_PAGE is set to 10 in our config file
  state.search.page = page;
  // save page number in our state obj
  const start = (page - 1) * _configJs.RES_PER_PAGE;
  const end = page * _configJs.RES_PER_PAGE;
  return state.search.results.slice(start, end);
};
const addBookmark = function (recipe) {
  // Add bookmark to the state object's array of them
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmark (adds white to the bookmark icon)
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};