// Import icons for package bundler
import favicon from 'url:../../img/favicon.png';
import icons from 'url:../../img/icons.svg';
import logo from 'url:../../img/logo.png';
import View from './View.js';

var Fraction = require('fractional').Fraction;

class RecipeView extends View {
  //~ CHILD SPECIFIC VARIABLES:
  _parentElement = document.querySelector('.recipe'); // recipeContainer fr/ controller
  _data; // the data originally from model goes here (usable file-wide, now)
  _errorMSG = `Could not find this recipe. Please try again`;
  _message = ''; //! set your success message later!!

  //—————————————————————【 UNIQUE METHODS 】——————————————————————————
  addHandlerRender(handler) {
    //# MVC Version of PubSub PART 2
    // Needs access to the controlRecipes ƒ() from controller
    // SOLUTION: call addHandlerRender() from controller and feed it controlRecipes as an arg
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
  _generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src=${this._data.image} alt=${this._data.title} class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
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
      ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
     
    </ul>
  </div>
    <!-- ------------------ STOP HERE ------------------ ->
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}

export default new RecipeView();
