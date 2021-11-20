import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
// import { useStoreContext} from '../../utils/GlobalState'
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from '../../utils/actions';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../state/index';
import { getCategories } from '../../state/action-creators/index'

function CategoryMenu() {

  // const [state, dispatch] = useStoreContext();
  const categories = useSelector((state)=>state.categories)
  const dispatch = useDispatch();

  // const { getCategories } = bindActionCreators(getCategories, dispatch)

  // const {categories} = state;

  const {data: categoryData} = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery,
    // then run dispatch();
    if (categoryData){
      console.log(categoryData)
      // executy our dispatch function with our action object indicating
      // the type of action and the data to set for our state for categories to dispatch
      getCategories(categoryData)
    }
  }, [categoryData, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
