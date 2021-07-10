import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {
    // id:
    // title:
    // publisher:
    // sourceUrl:
    // image:
    // ingredients:
  },
  search: {
    query: '', // what the user searched
    results: [],
    page: 1, // set page number to 1 by default
    resultsPerPage: 10,
  },
  bookmarks: [], // ID's only
  bookmarksID: [], // entire recipe objects contained for BM'd recipes
};

export const loadSearchResults = async function (searchFieldInput) {
  // MAIN OBJECTIVE: Change state object with your search results
  try {
    state.search.page = 1; // reset page to 1 after every search
    state.search.query = searchFieldInput; //$ update state obj
    // Scan API for your search query
    // fetchAPI returns an array of objects containing ID's recipe titles, images...etc
    const searchResults = await getJSON(
      `https://forkify-api.herokuapp.com/api/search?q=${searchFieldInput}`
    );
    const { recipes } = searchResults;
    const reformattedResults = recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
    state.search.results = reformattedResults; //$ update state obj results array
  } catch (err) {
    throw err;
    // want to handle errors in the controller catch block using view methods
  }
};

export const loadRecipe = async function (id) {
  // this function only changes the state object (DN return anything)
  try {
    // Store resolved fetchAPI promise value from getJSON() into "data"
    const data = await getJSON(`${API_URL}${id}`);
    console.log(`${API_URL}${id}`); // link to the JSON data

    // Reformat the info captured from our fetch request so the names are simpler
    const { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients, // an array
    };

    //# Keep the bookmark active even after viewing a new recipe
    // HOW: Check if the state object's bookmark array contains the ID of the recipe you supply this function
    // Set the "bookmarked" KVP equal to true or false accordingly
    if (state.bookmarksID.includes(id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
    //# ERROR HANDLING PART 1/3
    // PASSES REJECTED PROMISE TO THE OTHER ASYNC FUNCTION THAT USES loadRecipe()
  }
};
export const addBookmark = function (recipe) {
  // Add recipe ID to the state object's bookmark list/array
  state.bookmarks.push(recipe);
  state.bookmarksID.push(recipe.id);
  // Mark current recipe as bookmarked (adds white to the bookmark icon)
  state.recipe.bookmarked = true;
  console.log('state post addition', state);
};
export const deleteBookmark = function (recipe) {
  // Remove recipe ID from the state object's bookmark list/array
  //# Find index of the bookmarks array that contains id:
  const ind = state.bookmarksID.indexOf(recipe.id);
  state.bookmarks.splice(ind, 1);
  state.bookmarksID.splice(ind, 1);
  // Mark current recipe as NOT bookmarked (removes white to the bookmark icon)
  state.recipe.bookmarked = false;
  console.log('state post deletion', state);
};

//% PAGINATION PART 1:
//% AIM: Only show the first 10 search results in our rendered search list
//% Introduce a "Page #" button that renders other recipes if pressed
export const getSearchResultsPage = function (page = state.search.page) {
  // Adjust page buttons to a "start at 1" type of count
  // RES_PER_PAGE is set to 10 in our config file
  state.search.page = page; // save page number in our state obj
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};
