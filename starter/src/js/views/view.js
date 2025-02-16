import icons from 'url:../../img/icons.svg';

export default class view {
    _data;
    
    /**
     * Render the received object to the DOM
     * @param{Object | Object[]} data The data to be rendered (e.g. recipe)
     * @param{boolean} [render=true] If false, create a markup string intead of rendering to the DOM
     * @returns{undefined | string} A markup string is returned if render=false
     * @this{Object} View instance
     * @author Murali Nadadhur
     **/

    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;


        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);  
    }

    update(data) {
        //if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // Changed Text
            if(!(newEl.isEqualNode(curEl)) 
                && newEl.firstChild?.nodeValue.trim() !== ''){
                curEl.textContent = newEl.textContent;
            }

            //Changed Attributes
            if(!(newEl.isEqualNode(curEl))) {
               Array.from(newEl.attributes).forEach(attr => 
                curEl.setAttribute(attr.name, attr.value));
            }
        })
    }


    _clear() {
        this._parentElement.innerHTML = '';
    }

    _clearInput() {
        this._parentEl.querySelector('.search__field').value = '';
    }

    renderSpinner = function() {
        const markup = `      
            <div class="spinner">
                <svg>
                <use href="${icons}_icon-loader"></use>
                </svg>
            </div>
            `
        this._clear(); 
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `         
            <div class="message">
                <div>
                    <svg>
                    <use href=${icons}></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear(); 
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    renderError(message = this._errorMessage) {
        const markup = `         
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}_icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear(); 
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}