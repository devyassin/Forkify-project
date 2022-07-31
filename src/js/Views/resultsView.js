import icons from '../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';
class resultsView extends View {
  _parentelement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _generateMarkup() {
    return this._data
      .map(result => previewView._render(result, false))
      .join('');
  }
}

export default new resultsView();
