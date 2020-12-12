import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	notification,
	Row,
	Typography,
} from 'antd'
import LocalStorageService from '../../services/localStorageService'
import axios from '../../configs/axios'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'

function LoginComponent(props) {
	const [form] = Form.useForm()
	const { Title } = Typography
	const onFinish = () => {
		axios
			.post('/login', form.getFieldsValue())
			.then((result) => {
				LocalStorageService.setToken(result.data.token)
				const token = LocalStorageService.getToken()
				if (token) {
					const user = jwtDecode(token)
					if (user.is_admin) props.onLogin('admin')
					props.onLogin('staff')
				}
			})
			.catch((err) => {
				console.log(err)
				notification.error({ message: 'การเข้าสู่ระบบล้มเหลว' })
			})
	}

	return (
		<Row justify='center'>
			<Col>
				<Row justify='center'>
					<Title>Login</Title>
				</Row>
				<Divider />
				<Form form={form}>
					<Form.Item name='username' label='Username'>
						<Input />
					</Form.Item>
					<Form.Item name='password' label='Password'>
						<Input.Password />
					</Form.Item>
					<Button
						onClick={onFinish}
						type='primary'
						className='login-button'
						htmlType='submit'
					>
						Submit
					</Button>
				</Form>
			</Col>
		</Row>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (value) => {
			dispatch({ type: 'SET_ROLE', payload: value })
		},
	}
}

export default connect(null, mapDispatchToProps)(LoginComponent)
