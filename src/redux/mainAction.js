import {
  
  //HOME
  HOME_DATA,
  HOME_DATA_ERROR,

  //ARTICLE
  ARTICLE_DATA,
  ARTICLE_DATA_ERROR,

  //COVID
  MENU_DATA,
  MENU_DATA_2,
  MENU_DATA_ERROR,
  
  //REGISTER
  REGISTER_DATA,
  REGISTER_DATA_ERROR,
  
  //LOGIN
  LOGIN_DATA,
  LOGIN_DATA_ERROR,

} from './types';
import api from '../services/apiProvider';

//HOME
export const postHome = (params, headers) => {
  return dispatch => {
    api
      .postHome(params, headers)
      .then(response => {
        dispatch({type: HOME_DATA, response});
      })
      .catch(error => {
        const response = error.response.data;
        dispatch({type: HOME_DATA_ERROR, response});
      });
  };
};

//ARTICLE
export const getArticle = (params, header) => {
  return dispatch => {
    api
      .getArticle(params, header)
      .then(response => {
        dispatch({type: ARTICLE_DATA, response});
      })
      .catch(error => {
        const response = error.response;
        dispatch({type: ARTICLE_DATA_ERROR, response});
      });
  };
};

//COVID
export const getCoronaProv = params => {
  return dispatch => {
    api
      .getCoronaProv(params)
      .then(response => {
        dispatch({type: MENU_DATA, response});
      })
      .catch(error => {
        const response = error.response.data;
        dispatch({type: MENU_DATA_ERROR, response});
      });
  };
};
export const getCoronaStatus = params => {
  return dispatch => {
    api
      .getCoronaStatus(params)
      .then(response => {
        dispatch({type: MENU_DATA_2, response});
      })
      .catch(error => {
        const response = error.response.data;
        dispatch({type: MENU_DATA_ERROR, response});
      });
  };
};

//AUTH
export const registerProcess = params => {
  return dispatch => {
    api
      .registerProcess(params)
      .then(response => {
        dispatch({type: REGISTER_DATA, response});
      })
      .catch(error => {
        const response = error;
        dispatch({type: REGISTER_DATA_ERROR, response});
      });
  };
};
export const loginProcess = params => {
  return dispatch => {
    api
      .loginProcess(params)
      .then(response => {
        dispatch({type: LOGIN_DATA, response});
      })
      .catch(error => {
        const response = error;
        dispatch({type: LOGIN_DATA_ERROR, response});
      });
  };
};