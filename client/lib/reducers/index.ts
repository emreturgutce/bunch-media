import { combineReducers } from 'redux';

const initialState = {
	message: '',
};

function messageReducer(state = initialState, action: any) {
	switch (action.type) {
		case 'HELLO_MESSAGE':
			return {
				...state,
				message: 'HELLO',
			};
		default:
			return state;
	}
}

export default combineReducers({
	message: messageReducer,
});
