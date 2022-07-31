import { async } from 'regenerator-runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './Views/recipeView.js';
import searchViews from './Views/searchViews.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = location.hash.slice(1);
    if (!id) return;
    recipeView._renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView._render(model.state.recipe);

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView._renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView._renderSpinner();
    const query = searchViews._getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    if (model.state.search.results.length === 0) throw err;
    resultsView._render(model.getSearchResultsPage());
    paginationView._render(model.state.search);
  } catch (err) {
    resultsView._renderError();
  }
};

const controlPagination = async function (gotopage) {
  resultsView._render(model.getSearchResultsPage(gotopage));
  paginationView._render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipes :
  model.updateServings(newServings);

  //render View :
  // recipeView._render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView._render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView._render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView._renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView._render(model.state.recipe);

    bookmarksView._render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.togglewindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView._renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView._addHandlerRender(controlRecipes);
  recipeView._addHandlerUpdateServings(controlServings);
  recipeView._addHandlerAddBookmark(controlAddBookmark);
  searchViews._addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
