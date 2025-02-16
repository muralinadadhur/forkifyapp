
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchview.js';
import resultsview from './views/resultsview.js';
import bookmarksView from './views/bookmarksview.js';
import paginationview from './views/paginationview.js';
import addRecipeview from './views/addRecipeview.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

/*if (module.hot) {
  module.hot.accept();
}*/

const controlRecipes = async function() {
  //try {
    let id = window.location.hash.slice(1);

    if (!id) {
      return;
    }    
    recipeview.renderSpinner();
    
    //0. Update results view to mark selected search result
    resultsview.update(model.getSearchResultsPage());

    //1. Update the bookmark view
    bookmarksView.update(model.state.bookmarks);

    //2. Loading the recipe
    await model.loadRecipe(id);
    
    //3. Rendering the recipe
    recipeview.render(model.state.recipe);   
    
  /*} 
  catch(err) {
    recipeview.renderError(`${err}`);
  }*/
};

const controlSearchResults = async function() {
  try {

    resultsview.renderSpinner();

    //Get Query 
    const query = searchView.getQuery();
    if (!query) return;

    //Search Query
    await model.loadSearchResults(query);

    //Render results
    //resultsview.render(model.state.search.results);
    resultsview.render(model.getSearchResultsPage(1));

    //Render pagination results
    paginationview.render(model.state.search);
  
  } catch (err) {
    console.log(err);
  }
}

const controlPagination  = function(gotoPage) {
    //Render NEW results
    resultsview.render(model.getSearchResultsPage(gotoPage));

    //Render NEW Pagination buttons
    paginationview.render(model.state.search);
}

const controlServings = function(newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings)

  //Update the recipe view
  //recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);

}

const controlAddBookmark = function() {
  // Add or remove a bookmark
  if(!model.state.recipe.bookmarked)  
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeview.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmaks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  //console.log(newRecipe);
  try {

    //Loading spinner
    addRecipeview.renderSpinner();

    //Upload a recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeview.render(model.state.recipe);

    //Success message
    addRecipeview.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close window
    setTimeout(function() {
      addRecipeview.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    console.error(err)
    addRecipeview.renderError(err.message)
  }
}


const init = function() {
  console.log("this is a test");
  bookmarksView.addHandlerRender(controlBookmaks);
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPagination);
  addRecipeview.addHandlerUpload(controlAddRecipe);
};

init();