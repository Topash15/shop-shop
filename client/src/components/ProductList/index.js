import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../state/action-creators/index'

function ProductList() {
  // const [state, dispatch] = useStoreContext();
  const state = useSelector((state)=> state)
  const dispatch = useDispatch();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      const {products} = data
      // store in global state object
      dispatch(updateProducts(products));

      // save each product to indexedDB as well
      data.products.forEach(product => {
        idbPromise('products', 'put', product)
      })
    } else if (!loading) {
      // since we're offline, get all data from the 'products' store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set globabl state for offline browsing
        dispatch(updateProducts(products))
      })
    }
  }, [data, loading, dispatch])

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory)
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
