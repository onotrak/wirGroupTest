const mainInitialState = {

	//HOME
	homeData: {},
	homeDataSuccess: false,
	homeDataError: false,

	//ARTICLE
	articleData: {},
	articleSuccess: false,
	articleError: false,
	articleData: [],

	//COVID
	provCoronaSuccess: false,
	statusCoronaSuccess: false,
	getCoronaError: false,
	provCorona: {},
	statusCorona: {},
	
	//register
	registerData: {},
	registerDataSuccess: false,
	registerDataError: false,
	
	//login
	loginData: {},
	loginDataSuccess: false,
	loginDataError: false,
	isLoggedin: false,
	userData: {},

};

export {
  mainInitialState,
};