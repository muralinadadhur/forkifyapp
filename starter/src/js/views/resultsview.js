import view from './view.js';
import previewview from './previewview.js';
import icons from 'url:../../img/icons.svg';

class resultsview extends view {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipe found for your query. Please try again later.';
    _message = '';

    _generateMarkup() {
        return this._data.map(result => previewview.render(result, false)).join('')
    }
}

export default new resultsview();