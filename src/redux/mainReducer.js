import {

  //HOME
  RESET_HOME,
  HOME_DATA,
  HOME_DATA_ERROR,

  //MENU
  RESET_MENU,
  MENU_DATA,
  MENU_DATA_ERROR,
  
  //REGISTER
  RESET_REGISTER,
  REGISTER_DATA,
  REGISTER_DATA_ERROR,
  
  //LOGIN
  RESET_LOGIN,
  LOGIN_DATA,
  LOGIN_DATA_ERROR,

  //LOGOUT
  LOGOUT,

} from './types';
import {mainInitialState as initialState} from './initialState';

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    
    //HOME
    case RESET_HOME:
      return {
        homeDataSuccess: false,
        homeDataError: false,
      };
    case HOME_DATA:
      return {
        ...state,
        homeData: action.response,
        homeDataSuccess: true,
      };
    case HOME_DATA_ERROR:
      return {
        ...state,
        // homeData: action.response,
        homeDataError: true,
      };

    //MENU
    case RESET_MENU:
      return {
        menuDataSuccess: false,
        menuDataError: false,
      };
    case MENU_DATA:
      return {
        ...state,
        menuData: action.response,
        menuDataSuccess: true,
      };
    case MENU_DATA_ERROR:
      return {
        ...state,
        // menuData: action.response,
        menuDataError: true,
      };

    //REGISTER
    case RESET_REGISTER:
      return {
        registerSuccess: false,
        registerError: false,
        registerData: {}
      };
    case REGISTER_DATA:
      return {
        ...state,
        registerData: action.response,
        registerSuccess: true,
      };
    case REGISTER_DATA_ERROR:
      return {
        ...state,
        registerData: action.response,
        registerError: true,
      };

    //LOGIN
    case LOGOUT:
      return {
        isLoggedin: false,
        userData: {},
      };

    //LOGIN
    case RESET_LOGIN:
      return {
        loginSuccess: false,
        loginError: false,
        loginData: {},
      };
    case LOGIN_DATA:
      return {
        ...state,
        loginData: action.response,
        loginSuccess: true,
        userData: action.response.data,
        isLoggedin: true
      };
    case LOGIN_DATA_ERROR:
      return {
        ...state,
        loginData: action.response,
        loginError: true,
      };

    default:
      return state;
  }
};

export default mainReducer;