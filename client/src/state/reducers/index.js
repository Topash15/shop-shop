import { combineReducers } from 'redux';
// import reducers
import productReducer from './productsReducer'
import categoriesReducer from './categoriesReducer'
import cartReducer from './cartReducer'
import cartOpenReducer from './cartOpenReducer'
import currentCategoryReducer from './currentCategoriesReducer'


const reducers = combineReducers({
    products: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    cartOpen: cartOpenReducer,
    currentCategory: currentCategoryReducer
});

export default reducers