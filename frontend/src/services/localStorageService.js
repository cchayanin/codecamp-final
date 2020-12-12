import jwtDecode from 'jwt-decode'

function setToken(token) {
	localStorage.setItem('ACCESS_TOKEN', token)
}

function getToken() {
	return localStorage.getItem('ACCESS_TOKEN')
}

function removeToken() {
	localStorage.removeItem('ACCESS_TOKEN')
}

function getRole() {
	const token = getToken()
	if (token) {
		const user = jwtDecode(token)
		if (user.is_admin) return 'admin'
		return 'staff'
	}
	return 'guest'
}

const localStorageService = {
	setToken,
	getToken,
	removeToken,
	getRole,
}

export default localStorageService
