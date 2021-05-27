// handle state for product list ..

import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  // takes two things as arg.. : (initialState, action)
  switch (action.type) {
    // request
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    // success
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // fail
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
