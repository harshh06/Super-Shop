// handle state for product list ..

import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  // takes two things as arg.. : (initialState, action)
  switch (action.type) {
    // request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // success
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    // fail
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
