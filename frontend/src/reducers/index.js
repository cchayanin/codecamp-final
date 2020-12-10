import {
	TOGGLE_VISIBLE,
	EDIT_FORM,
	TOGGLE_EDIT,
	FETCH_COURSE,
} from '../actiontypes'
const initialState = {
	visible: false,
	isEdit: false,
	record: {},
	courseDataSource: {},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_VISIBLE:
			state = {
				...state,
				visible: !action.payload,
			}
			break
		case EDIT_FORM:
			state = {
				...state,
				record: action.payload,
			}
			break
		case TOGGLE_EDIT:
			state = {
				...state,
				isEdit: !action.payload,
			}
			break
		case FETCH_COURSE:
			state = {
				...state,
				courseDataSource: action.payload,
			}
			break

		default:
			break
	}
	return state
}

export default reducer
