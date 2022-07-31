import icons from '../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';
class BookmarksView extends View {
  _parentelement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView._render(bookmark, false))
      .join('');
  }
  
}

export default new BookmarksView();
