import Course from '../pages/Course'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Person from '../pages/Person'
import Register from '../pages/Register'
import User from '../pages/User'

const components = {
	home: {
		url: '/',
		component: Home,
	},
	course: {
		url: '/course',
		component: Course,
	},
	login: {
		url: '/login',
		component: Login,
	},
	person: {
		url: '/person',
		component: Person,
	},
	register: {
		url: '/register',
		component: Register,
	},
	user: {
		url: '/user',
		component: User,
	},
}

const configRole = {
	admin: {
		allowedRoutes: [
			components.course,
			components.person,
			components.register,
			components.user,
			components.home,
		],
		redirectRoutes: '/',
	},
	staff: {
		allowedRoutes: [
			components.course,
			components.person,
			components.register,
			components.home,
		],
		redirectRoutes: '/',
	},
	guest: {
		allowedRoutes: [components.login],
		redirectRoutes: '/login',
	},
}
export default configRole
