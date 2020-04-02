import {

  //HOME
  RESET_HOME,
  HOME_DATA,
  HOME_DATA_ERROR,

  //MENU
  RESET_MENU,
  MENU_DATA,
  MENU_DATA_ERROR,

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
    default:
      return state;
  }
};

export default mainReducer;