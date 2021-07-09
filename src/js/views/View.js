import icons from 'url:../../img/icons.svg';

export default class View {
  //~ The child classes will define these variables up top
  //~ each child's variable values will differ (diff parent elements for example)
  /* CHILD-SPECIFIC VARIABLES FOR CHILD CLASSES OF View

  _data;  (data from model's fetchAPI call, passed to view via the controller)
  _parentElement = (most of our methods will be applied to this parent block)
  _data;  (the data originally from model, passed to view via controller)
  _errorMSG = (depends on element that its applied to)
  _message = (successMSG)
  */
  //—————————————————————【】——————————————————————————

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // Guard clause in case we retreive no data, OR that data is an empty array
    this._data = data;
    // Set data variable equal to the info we pass in as an arg (info came from model=>controller)
    const markup = this._generateMarkup(); //% SO IMPORTANT:
    //% This will generate markup by passing on the job to another module's generateMarkup method.
    //% You define how that works in that module.
    //% But you can use this render function on autopilot every single time

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // add your markup which is pre-styled in SASS
  }
  update(data) {
    this._data = data;
    // Set data variable equal to the info we pass in as an arg (info came from model=>controller)
    const newMarkup = this._generateMarkup();
    //———————————【everything above is identical to render()】————————————————

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Capture all elements within the current HTML container and the one about 2Brendered
    // conv nodelists into arrays with Array.from(), you can loop over them ATST
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // 1) Updates changed TEXT
      // Changes old DOM elements with new DOM elements, but only those whose text content's changed
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // 2) Updates changed ATTRIBUTES
      // We change the old attributes with the new ones
      if (!newEl.isEqualNode(curEl)) {
        console.log(newEl.attribute); // logs attributes of all EL's that have changed
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(message = this._errorMSG) {
    //# ERROR HANDLING PART 3/3
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
