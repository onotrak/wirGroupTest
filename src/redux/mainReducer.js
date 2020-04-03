import {

  //HOME
  RESET_HOME,
  HOME_DATA,
  HOME_DATA_ERROR,

  //ARTICLE
  RESET_ARTICLE,
  RESET_DATA_ARTICLE,
  ARTICLE_DATA,
  ARTICLE_DATA_ERROR,

  //MENU
  RESET_MENU,
  MENU_DATA,
  MENU_DATA_2,
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
        ...state,
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
    
    //ARTICLE
    case RESET_ARTICLE:
      return {
        ...state,
        articleSuccess: false,
        articleError: false,
      };
    case RESET_DATA_ARTICLE:
      return {
        ...state,
        articleData: []
      };
    case ARTICLE_DATA:
      return {
        ...state,
        articleData: action.response.data,
        articleSuccess: true,
      };
    case ARTICLE_DATA_ERROR:
      return {
        ...state,
        // articleData: action.response,
        articleError: true,
      };

    //MENU
    case RESET_MENU:
      return {
        ...state,
        provCoronaSuccess: false,
        statusCoronaSuccess: false,
        getCoronaError: false,
      };
    case MENU_DATA:
      return {
        ...state,
        provCorona: action.response,
        provCoronaSuccess: true,
      };
    case MENU_DATA_2:
      return {
        ...state,
        statusCorona: action.response,
        statusCoronaSuccess: true,
      };
    case MENU_DATA_ERROR:
      return {
        ...state,
        getCoronaError: true,
      };

    //REGISTER
    case RESET_REGISTER:
      return {
        ...state,
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
        ...state,
        isLoggedin: false,
        userData: {},
      };

    //LOGIN
    case RESET_LOGIN:
      return {
        ...state,
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