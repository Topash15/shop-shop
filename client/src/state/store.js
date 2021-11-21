import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
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
