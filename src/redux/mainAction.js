import {
  
  //HOME
  HOME_DATA,
  HOME_DATA_ERROR,

  //MENU
  MENU_DATA,
  MENU_DATA_ERROR,

} from './types';
import api from '../services/apiProvider';

//HOME
export const postHome = (params, headers) => {
  return dispatch => {
    api
      .postHome(params, headers)
      .then(response => {
        console.log('onotrak response home',response);
        dispatch({type: HOME_DATA, response});
      })
      .catch(error => {
        const response = error.response.data;
        console.log(response, 'error');
        dispatch({type: HOME_DATA_ERROR, response});
      });
  };
};

//MENU
export const getMenu = params => {
  return dispatch => {
    api
      .getMenu(params)
      .then(response => {
        console.log(response);
        dispatch({type: MENU_DATA, response});
      })
      .catch(error => {
        const response = error.response.data;
        console.log(response, 'error');
        dispatch({type: MENU_DATA_ERROR, response});
      });
  };
};