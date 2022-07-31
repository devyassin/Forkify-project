import View from './View';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentelement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentelement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const GoToPage = +btn.dataset.goto;
      handler(GoToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //if there is 1 page and others :

    if (currPage === 1 && numPages > 1) {
      return `
    <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>`;
    }

    // if last page :
    if (currPage === numPages && numPages > 1) {
      return `
    <button data-goto=${currPage - 1} class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
    </button>`;
    }

    // if middle of pages
    if (currPage < numPages) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // if there is only 1 page
    return '';
  }
}

export default new paginationView();
