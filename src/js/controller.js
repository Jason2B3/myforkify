// import everything labelled as an export in model.js
import * as model from './model.js';
// Import object from recipeView.js
import recipeView from './views/recipeView.js';

// default NPM imports
if (module.hot) module.hot.accept();
import 'core-js/stable'; // "enables polyfills"
import 'regenerator-runtime/runtime'; //"enables polyfills for async JS"

//—————————————————————【 END OF IMPORTS ZONE 】——————————————————————————

const recipeContainer = document.querySelector('.recipe');
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
    recipeView.render(model.state.recipe)

    
  } catch (err) {
    console.error(err);
  }
};
// window.addEventListener('hashchange', callbackA)
// window.addEventListener('load', callbackA)

['hashchange', 'load'].forEach(eventType =>
  window.addEventListener(eventType, controlRecipes)
);

// Render the recipe to the side whenever the website's hash changes

/* 
SHOW LIST OF SEARCH RESULTS: 
let searchID= "shrimp"
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchID}&key=6ff36859-c745-4afa-abe5-d1acdd55cf65`
    );

SHOW DETAILS ABOUT 1 PARTICULAR RECIPE

*/
