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

//ARTICLE
export const getArticle = (params, header) => {
  return dispatch => {
    api
      .getArticle(params, header)
      .then(response => {
        console.log('article status', response);
        dispatch({type: ARTICLE_DATA, response});
      })
      .catch(error => {
        const response = error.response;
        console.log(response, 'error');
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
        console.log('corona prov', response);
        dispatch({type: MENU_DATA, response});
      })
      .catch(error => {
        const response = error.response.data;
        console.log(response, 'error');
        dispatch({type: MENU_DATA_ERROR, response});
      });
  };
};
export const getCoronaStatus = params => {
  return dispatch => {
    api
      .getCoronaStatus(params)
      .then(response => {
        console.log('corona status', response);
        dispatch({type: MENU_DATA_2, response});
      })
      .catch(error => {
        const response = error.response.data;
        console.log(response, 'error');
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
        console.log('onotrak response register',response);
        dispatch({type: REGISTER_DATA, response});
      })
      .catch(error => {
        const response = error;
        console.log(response, 'error');
        dispatch({type: REGISTER_DATA_ERROR, response});
      });
  };
};
export const loginProcess = params => {
  return dispatch => {
    api
      .loginProcess(params)
      .then(response => {
        console.log('onotrak response login',response);
        dispatch({type: LOGIN_DATA, response});
      })
      .catch(error => {
        const response = error;
        console.log(response, 'error');
        dispatch({type: LOGIN_DATA_ERROR, response});
      });
  };
};