import icons from 'url:../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;
  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e) { 
      const nearestBtn= e.target.closest('.btn--inline')
      if(!nearestBtn) return; // guard clause in case we click the parent
      const goToPage= +nearestBtn.dataset.goto
      handler(goToPage) 
      // pass controller's controlPagination() the dataset value 
    })
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage= this._data.page
    // Page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage-1}</span>
    </button>`;;
    }
    // Page in between 2 others
    if (currentPage < numPages) {
      return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage-1}</span>
    </button>
    <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
    }
    // Page 1, with NO other pages
    return ""
  }
  
}

export default new paginationView();

