import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Cart from "../components/Cart";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";

import { idbPromise } from "../utils/helpers";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCartAction,
  updateCartQuantityAction,
  addItemToCartAction,
  updateProducts,
} from "../state/action-creators/index";

function Detail() {

  // redux state
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // pulls product id from link
  const { id } = useParams();

  // state to change current product
  const [currentProduct, setCurrentProduct] = useState({});

  // query to pull all products
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // deconstructs products from state
  const { products, cart } = state;

  useEffect(() => {
    // pulls product info from state
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // will pull product from query/server if no state available
    else if (data) {
      dispatch(updateProducts(data.products));

      // updates indexedDB with product list
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }

    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      const {_id} = itemInCart
      const quantity = itemInCart.purchaseQuantity
      dispatch(updateCartQuantityAction(_id, quantity)
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(addItemToCartAction(currentProduct));
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    const {_id} = currentProduct
    dispatch(removeFromCartAction(_id));

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
