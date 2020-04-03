import API from './axiosConfig';
import * as url from './urls';

export default {
  //********************* */
  
	//HOME
	postHome: (params, headers) => {
		return API(url.HOME_PROCESS, {
			method: 'POST',
			head: {
				'Content-Type': 'application/json',
				Authorization: headers,
			},
			body: {
				...params,
			},
		});
	},

	//MENU
	getMenu: params => {
		return API(url.MENU_PROCESS, {
			method: 'GET',
			head: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + params,
			},
		});
	},

	//AUTH
	registerProcess: params => {
		return API(url.REGISTER_PROCESS, {
			method: 'POST',
			head: {
				'Content-Type': 'application/json',
				// Authorization: headers,
			},
			body: {
				...params,
			},
		});
	},
	loginProcess: params => {
		return API(url.LOGIN_PROCESS, {
			method: 'POST',
			head: {
				'Content-Type': 'application/json',
				// Authorization: headers,
			},
			body: {
				...params,
			},
		});
	},

};
