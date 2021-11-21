import { createStore, applyMiddleware } from "redux";
import reducers from "../utils/reducers";
import thunk from "redux-thunk";

export const store = createStore(
  reducers,
  {
    products: [],
    categories: [],
    currentCategory: "",
    cartOpen: false,
    cart: [],
  },
  applyMiddleware(thunk)
);
