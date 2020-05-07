import { action, thunk } from "easy-peasy";
import { ApiService } from "../../Store";
import {
	setLoginCredentials,
	getLoginCredentials,
	resetLoginCredentials
} from "../../Services/Keychain";
import { STATUS } from "../../Constants";
import { APP_STATE } from "../../Constants/index";
import BaseModel from "./Base";

import { showErrorToast, showLoading } from "../../Lib/Toast";

const checkLogin = thunk(async (actions, payload, { dispatch, injections }) => {
	const { api } = injections;

	const credentials = await getLoginCredentials();
	if (credentials) {
		// api.setAuthorizationHeader(credentials.access_token);
		//dispatch.user.requestUserProfile();
		actions.changeAppState(APP_STATE.PRIVATE);
	} else {
		actions.changeAppState(APP_STATE.PUBLIC);
	}
});
/**
 * Fields
• email (string, max: 32, required)
• username (string, max: 64)
• first_name (string, max: 32, required) • last_name (string, max: 32, required) • role (integer, default: 1)
– PRODUCER: 1 – TRANSPORT: 2 – MEDICAL: 3
• phone (string, max: 13, required)
• city (integer, required, see cities.csv)
 */
const createUser = thunk(async (actions, payload, { dispatch }) => {

	if (!payload.email || !payload.password || !payload.username || !payload.first_name || !payload.role || !payload.phone || !payload.city) {
	//	return;
	}
	actions.updateStatus(STATUS.FETCHING);
	 let response = await ApiService.createUser(payload);

/*	let response = await setLoginCredentials(
		payload.username,
		payload.password
	);*/

	//mocking api
	/*
	setTimeout(() => {
		actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
		if (!response.status) {
			console.warn(response.error);
		} else {
			actions.changeAppState(APP_STATE.PRIVATE);
		}
	}, 1000);
	*/
		ApiService.setAuthorizationHeader(response.data.access_token);
	 	dispatch.user.requestUserProfile();
});

const CreateUser = {
	//include BaseModel
	...BaseModel(),
	//include all thunks or actions defined separately
    checkLogin,
    createUser,
	appstate: APP_STATE.UNKNOWN,
	changeAppState: action((state, payload) => {
		state.appstate = payload;
	}),
	onLoginInputChange: action((state, { key, value }) => {
		state[key] = value;
	})
};

export default CreateUser;
