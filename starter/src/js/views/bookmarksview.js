import view from './view.js';
import previewview from './previewview.js';
import icons from 'url:../../img/icons.svg';

class BookMarksView extends view {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        return this._data.map(bookmark => previewview.render(bookmark, false)).join('')
    }

    
}

export default new BookMarksView();