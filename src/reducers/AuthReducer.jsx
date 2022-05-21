import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "../types/types";

export const authInitialState = {
  user: null,
  loginError: "",
  signupError: "",
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, user: payload };
    case LOGIN_ERROR:
      return { ...state, loginError: payload };
    case LOGOUT:
      return { user: null, loginError: "", signupError: "" };
    case SIGNUP_SUCCESS:
      return { ...state, user: payload };
    case SIGNUP_ERROR:
      return { ...state, signupError: payload };
    default:
      return authInitialState;
  }
};
