import React from "react";

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise} from '../../utils/helpers'

// redux
import { useSelector, useDispatch} from 'react-redux';
import { removeFromCartAction, updateCartQuantityAction} from '../../state/action-creators/index'

const CartItem = ({ item }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // deconstructs _id from item
  const {_id} = item

  const removeFromCart = item => { 
    dispatch(removeFromCartAction(_id));

    // removes item from IDB cart
    idbPromise('cart','delete', {...item})
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCartAction(_id));

      // remove from IDB cart
      idbPromise('cart', 'delete', {...item})
    } else {
      // quantity subtracts 1 because update cart will automatically
      // add 1 to quantity
      let quantity = parseInt(value) - 1
      dispatch(updateCartQuantityAction(_id, quantity));

      // update item quantity in IDB cart
      idbPromise('cart', 'put', {...item, purchaseQuantity: parseInt(value)})
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input type="number" placeholder="1" value={item.purchaseQuantity} onChange={onChange}/>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
