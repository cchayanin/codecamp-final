import { notification } from 'antd'
import axios from 'axios'
import localStorageService from '../services/localStorageService'
import LocalStorageService from '../services/localStorageService'

axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.request.use(
	(config) => {
		if (config.url.includes('/login')) return config

		const token = LocalStorageService.getToken()

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(err) => {
		Promise.reject(err)
	},
)

axios.interceptors.response.use(
	(response) => {
		return response
	},
	(err) => {
		if (err.response?.status === 401) {
			localStorageService.removeToken()
			window.location.reload()
			notification.error({
				message: 'กรุณาเข้าสู่ระบบใหม่',
			})
			return Promise.reject(err)
		}
		return Promise.reject(err)
	},
)

export default axios
