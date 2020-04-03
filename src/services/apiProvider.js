import API from './axiosConfig';
import API2 from './axiosConfigCorona';
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
	getCoronaProv: params => {
		return API2(url.MENU_PROCESS, {
			method: 'GET',
			head: {
				'Content-Type': 'application/json',
			},
		});
	},
	getCoronaStatus: params => {
		return API2(url.MENU_PROCESS_2, {
			method: 'GET',
			head: {
				'Content-Type': 'application/json',
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
