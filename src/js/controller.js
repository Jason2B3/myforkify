// import everything labelled as an export in model.js
import * as model from './model.js';

// default NPM imports
if (module.hot) module.hot.accept();
import 'core-js/stable'; // "enables polyfills"
import 'regenerator-runtime/runtime'; //"enables polyfills for async JS"
const recipeContainer = document.querySelector('.recipe');

// Import icons for package bundler
import favicon from 'url:../img/favicon.png';
import icons from 'url:../img/icons.svg';
import logo from 'url:../img/logo.png';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
//—————————————————————【】——————————————————————————

const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause if we have no ID
    renderSpinner(recipeContainer);

    //@  Load the recipe (async F which returns a promise)
    // the below function returns nothing, so it needs no variable. just changes the state object
    // it IS async, which returns a promise- so we need await to halt our ƒ()'s execution
    await model.loadRecipe(id);
    const { recipe } = model.state; // destructure the state object for the recipe obj

    //@  Render the recipe  ——————————————————————————————————————————————————————
    const markup = `<figure class="recipe__fig">
    <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map(ing => {
          return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity || ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
        })
        .join('')}
     
    </ul>
  </div>
    <!-- ------------------ STOP HERE ------------------ ->
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = ''; //eliminate your "have fun" MSG present at the start
    recipeContainer.insertAdjacentHTML('afterbegin', markup); // add your markup which is pre-styled in SASS
  } catch (err) {
    console.error(err);
  }
};
// window.addEventListener('hashchange', callbackA)
// window.addEventListener('load', callbackA)

['hashchange', 'load'].forEach(eventType =>
  window.addEventListener(eventType, showRecipe)
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
