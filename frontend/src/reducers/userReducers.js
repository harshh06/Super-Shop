import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginReducer = (state = { products: [] }, action) => {
  // takes two things as arg.. : (initialState, action)
  switch (action.type) {
    // request
    case USER_LOGIN_REQUEST:
      return { loading: true };
    // success
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // fail
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
