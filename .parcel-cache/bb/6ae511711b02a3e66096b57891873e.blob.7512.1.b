require('url:../img/favicon.png');
var _urlImgIconsSvg = require('url:../img/icons.svg');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _urlImgIconsSvgDefault = _parcelHelpers.interopDefault(_urlImgIconsSvg);
require('url:../img/logo.png');
require('core-js/stable');
require('regenerator-runtime/runtime');
if (module.hot) module.hot.accept();
// "enables polyfills for async JS"
const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2
// —————————————————————【】——————————————————————————
const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${_urlImgIconsSvgDefault.default}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
const showRecipe = async function () {
  try {
    // @  Fetch recipe data  ——————————————————————————————————————————————————————
    let recipeID = '5ed6604591c37cdc054bc886';
    renderSpinner(recipeContainer);
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}?key=6ff36859-c745-4afa-abe5-d1acdd55cf65`);
    if (!res.ok) throw new Error('food cannot be found in our database');
    // custom error msg
    let parsedRes = await res.json();
    // Reformat the info captured from our fetch request so the names are simpler
    let {recipe} = parsedRes.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    console.log(recipe);
    // @  Render the recipe  ——————————————————————————————————————————————————————
    const markup = `<figure class="recipe__fig">
    <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${_urlImgIconsSvgDefault.default}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${_urlImgIconsSvgDefault.default}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${_urlImgIconsSvgDefault.default}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${_urlImgIconsSvgDefault.default}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="recipe__user-generated">
      <svg>
        <use href="${_urlImgIconsSvgDefault.default}#icon-user"></use>
      </svg>
    </div>
    
    <button class="btn--round">
      <svg class="">
        <use href="${_urlImgIconsSvgDefault.default}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(ing => {
      return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${_urlImgIconsSvgDefault.default}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity || ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
    }).join('')}
     
    </ul>
  </div>
    <!-- ------------------ STOP HERE ------------------ ->
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${_urlImgIconsSvgDefault.default}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = '';
    // eliminate your "have fun" MSG present at the start
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.error(err);
  }
};
showRecipe();
