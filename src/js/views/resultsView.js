import icons from 'url:../../img/icons.svg';
import View from './View.js';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMSG = `Recipe not found`;
}
export default new resultsView();
