var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
require('url:../../img/favicon.png');
var _urlImgIconsSvg = require('url:../../img/icons.svg');
var _urlImgIconsSvgDefault = _parcelHelpers.interopDefault(_urlImgIconsSvg);
require('url:../../img/logo.png');
var _ViewJs = require('./View.js');
var _ViewJsDefault = _parcelHelpers.interopDefault(_ViewJs);
class bookmarksView extends _ViewJsDefault.default {
  _parentElement = document.querySelector('.bookmarks__list');
  _bookmarksButton = document.querySelector('.nav__btn--bookmarks');
  _errorMSG = `No bookmarks yet. Find a nice recipe you'd like to save :)`;
  _bookmarks;
  _bookmarksID;
  _data;
  // equal to the recipe object
  _generateMarkup() {
    // Create several previews- 1 for each recipe we loaded/placed in _data
    let generateAll = this._bookmarks.map(dataObj => {
      return this._generateMarkupPreview(dataObj);
    }).join('');
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
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <!--
        <div class="preview__user-generated">
          <svg>
            <use href="${_urlImgIconsSvgDefault.default}#icon-user"></use>
          </svg>
        </div>
        -->
      </div>
    </a>
  </li>`;
  }
}
exports.default = new bookmarksView();
