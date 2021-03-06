class SearchView {
  _parentEl = document.querySelector('.search'); // search form's container
  getQuery() {
    // Get what was typed in the search field, and clear it
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    //# PUB SUB INSTANCE 2: Publisher
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
