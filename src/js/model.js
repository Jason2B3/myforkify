import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '', // what the user searched
    results: [],
    page: 1, // set page number to 1 by default
    resultsPerPage: 10,
  },
};

export const loadSearchResults = async function (searchFieldInput) {
  // MAIN OBJECTIVE: Change state object with your search results
  try {
    model.state.search.page=1 // reset page to 1 after every search
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
    state.search.results = reformattedResults; //$ update state obj
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
    // console.log('raw parsed JSON incoming');
    // console.log(data);
    // Reformat the info captured from our fetch request so the names are simpler
    const { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings, // not always there
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients, // an array
    };
    // console.log('state object recipe incoming');
    // console.log(state.recipe);
  } catch (err) {
    throw err;
    //# ERROR HANDLING PART 1/3
    // PASSES REJECTED PROMISE TO THE OTHER ASYNC FUNCTION THAT USES loadRecipe()
  }
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
