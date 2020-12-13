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
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'

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
					window.location.reload()
				}
			})
			.catch((err) => {
				console.log(err)
				notification.error({ message: 'การเข้าสู่ระบบล้มเหลว' })
			})
	}

	return (
		<Row justify='center' className='login-form'>
			<Col xs={16} sm={12} md={10} lg={8} xl={6} xxl={4}>
				<Row justify='center'>
					<Title level={2}>Course Registration</Title>
				</Row>
				<Divider />
				<Form form={form}>
					<Form.Item name='username'>
						<Input prefix={<UserOutlined />} placeholder='Username' />
					</Form.Item>
					<Form.Item name='password'>
						<Input.Password
							prefix={<UnlockOutlined />}
							placeholder='Password'
						/>
					</Form.Item>
					<Button
						onClick={onFinish}
						type='primary'
						className='login-button'
						htmlType='submit'
					>
						Log in
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
