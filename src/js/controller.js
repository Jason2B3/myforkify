import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { default as searchView } from './views/searchView.js';
import ResultsView from './views/resultsView.js';

// default NPM imports
if (module.hot) module.hot.accept();
import 'core-js/stable'; // "enables polyfills"
import 'regenerator-runtime/runtime'; //"enables polyfills for async JS"

//—————————————————————【 END OF IMPORTS ZONE 】——————————————————————————

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause if we have no ID
    recipeView.renderSpinner();
    //@  Load the recipe (async F which returns a promise)
    // the below function returns nothing, so it needs no variable. just changes the state object
    // it IS async, which returns a promise- so we need await to halt our ƒ()'s execution
    await model.loadRecipe(id);
    //@  Render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    //@ ERROR HANDLING PART 2
    // We use functions from view to render the visuals to convey an error
    // However, we call those render functions in controller (as MVC encourages)
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 0) Render Spinner while we wait for real stuff to happen
    ResultsView.renderSpinner();
    // 1) Get search query and clear input field
    const sq = searchView.getQuery(); // grab search field text
    if (!sq) return; // guard clause in case we search nothing

    // 2) Load search results
    await model.loadSearchResults(sq); // load search results
    console.log(model.state.search);

    // 3) Render results
    // coming up soon!
  } catch (err) {
    ResultsView.renderError();
  }
};

//% MVC Version of PubSub PART 1 and 2
const init = function () {
  recipeView.addHandlerRender(controlRecipes); //#PART 1
  searchView.addHandlerSearch(controlSearchResults); //# PART 2
};
init();
