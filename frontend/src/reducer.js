import LocalStorageService from './services/localStorageService'

const initialState = {
	role: LocalStorageService.getRole(),
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ROLE':
			state = {
				...state,
				role: action.payload,
			}

			break

		default:
			break
	}
	return state
}

export default reducer
