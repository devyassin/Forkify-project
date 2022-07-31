class searchViews {
  _parentelement = document.querySelector('.search');

  _getQuery() {
    const query = this._parentelement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentelement.querySelector('.search__field').value = '';
  }

  _addHandlerSearch(handler) {
    this._parentelement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchViews();
