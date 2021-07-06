import icons from 'url:../../img/icons.svg';

export default class View {
  //~ The child classes will define these variables up top
  //~ each child's variable values will differ (diff parent elements for example)
  /* CHILD-SPECIFIC VARIABLES
  _data;
  _parentElement = document.querySelector('.recipe'); // recipeContainer fr/ controller
  _data; // the data originally from model goes here (usable file-wide, now)
  _errorMSG = `Could not find this recipe. Please try again`;
  _message = ''; 
  */
  //—————————————————————【】——————————————————————————
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // add your markup which is pre-styled in SASS
  }
  renderError(message = this._errorMSG) {
    // We want to render content when a fetchAPI call goes wrong
    // Regular shmucks don't check the console logs
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${this._errorMSG}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage() {
    // We want to render content when a fetchAPI call goes wrong
    // Regular shmucks don't check the console logs
    const markup = `<div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${this._message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    // Clear out all elements inside a specific HTML element
    this._parentElement.innerHTML = '';
  }
}
