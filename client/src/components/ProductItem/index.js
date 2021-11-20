import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";

import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers"

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  const [state, dispatch] = useStoreContext();

  // deconstructs cart from state
  const { cart } = state;

  const addToCart = () => {
    // checks if item is already in cart
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)

    // if item is in cart, update quantity
    // otherwise add item to cart with quantity of 1
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data 
      // and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      // if product isn't in cart already, add to current cart in indexedDB
      idbPromise('cart', 'put', {...item, purchaseQuantity: 1});
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
