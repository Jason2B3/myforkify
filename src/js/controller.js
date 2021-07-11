import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { default as searchView } from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// default NPM imports
if (module.hot) module.hot.accept();
import 'core-js/stable'; // "enables polyfills"
import 'regenerator-runtime/runtime'; //"enables polyfills for async JS"
import resultsView from './views/resultsView.js';

//—————————————————————【 END OF IMPORTS ZONE 】——————————————————————————
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

//@ CONTROLLER: Click on a listed recipe to load/render
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause if we have no ID
    recipeView.renderSpinner();

    // 0) Update results view to keep the selected search result highlighted/shaded
    resultsView.update(model.getSearchResultsPage());

    // 1)  Load the recipe (async F which returns a promise)
    await model.loadRecipe(id);
    // the below function returns nothing, so it needs no variable. just changes the state object
    // it IS async, which returns a promise- so we need await to halt our ƒ()'s execution

    // 2)  Render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    //# ERROR HANDLING PART 2/3
    // We use functions from view to render the visuals to convey an error
    // However, we call those render functions in controller (as MVC encourages)
    recipeView.renderError();
  }
};
//@ CONTROLLER: Using the searchbar
const controlSearchResults = async function () {
  try {
    // 0) Render Spinner while we wait for real stuff to happen
    ResultsView.renderSpinner();
    // 1) Get search query and clear input field
    const sq = searchView.getQuery(); // grab search field text
    if (!sq) return; // guard clause in case we search nothing

    // 2) Load search results
    await model.loadSearchResults(sq); // load search results

    // 3) Render results
    ResultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
    // will render Pg 2,3 search results in controlPagination()
  } catch (err) {
    ResultsView.renderError(model.state.search.results);
  }
};

//@ CONTROLLER: Pressing a pagination button to go forward or backward
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
  // FYI: goToPage is an argument fed to this ƒ() by...
  // paginationView.js addHandlerClick() function
};
const controlAddBookmark = function () {
  // 1a) If a recipe IS NOT bookmarked yet, bookmark it
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
    // 1b) Update recipeView
    recipeView.update(model.state.recipe);
    // 1c) Give bookmark data to the bookMarksView Module
    bookmarksView._dataTransfer(model.state.bookmarks, model.state.bookmarksID);
    return;
  }
  // 2a) If a recipe IS bookmarked, remove it
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe);
    // 2b) update recipeView
    recipeView.update(model.state.recipe);
    // 2c) Give bookmark data to the bookMarksView Module
    bookmarksView._dataTransfer(model.state.bookmarks, model.state.bookmarksID);
    return;
  }
};

const controlHoverBookmark = function () {
  // List all the bookmarked recipe previews, but only when hovering
  // Shadow the recipe we're currently on
  // Move the shadow when we hover over a specific recipe on the preview list
  bookmarksView._dataTransfer(model.state.bookmarks, model.state.bookmarksID);
  bookmarksView.render(model.state.bookmarks);
};

//@ This is the MVC Version of Pub-Sub
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmark(controlAddBookmark);
  bookmarksView.addHandlerPreview(controlHoverBookmark);
  //@ each handler is a shotcaller function defined inside the controller
};
init();
