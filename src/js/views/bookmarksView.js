// Import icons for package bundler
import favicon from 'url:../../img/favicon.png';
import icons from 'url:../../img/icons.svg';
import logo from 'url:../../img/logo.png';
import View from './View.js';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _bookmarksButton = document.querySelector('.nav__btn--bookmarks');
  _errorMSG = `No bookmarks yet. Find a nice recipe you'd like to save :)`;
  _bookmarks;
  _bookmarksID;
  _data; // equal to the recipe object
  _generateMarkup() {
    // Create several previews- 1 for each recipe we loaded/placed in _data
    //! NOT ACTIVATED
    let generateAll = this._bookmarks
      .map(dataObj => {
        return this._generateMarkupPreview(dataObj);
      })
      .join('');
    console.log(generateAll);
    return generateAll;
  }

  addHandlerPreview(handler) {
    this._bookmarksButton.addEventListener('mouseenter', handler);
  }
  _dataTransfer(arg1, arg2) {
    this._bookmarks = arg1;
    this._bookmarksID = arg2;
  }
  _generateMarkupPreview(result) {
    // Keep a recipe highlighted after clicking on it in the search results list
    return `<li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__name">
          ${result.title}
        </h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}
export default new bookmarksView();
