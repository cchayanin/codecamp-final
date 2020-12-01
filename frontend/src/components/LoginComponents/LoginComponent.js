import { Button, Col, Divider, Form, Input, Row } from 'antd'
import Title from 'antd/lib/typography/Title'

export default function LoginComponent() {
	return (
		<Row justify='center'>
			<Col>
				<Row justify='center'>
					<Title>Login</Title>
				</Row>
				<Divider />
				<Form>
					<Form.Item name='username' label='Username'>
						<Input />
					</Form.Item>
					<Form.Item name='password' label='Password'>
						<Input.Password />
					</Form.Item>
					<Button type='primary' className='login-button' htmlType='submit'>
						Submit
					</Button>
				</Form>
			</Col>
		</Row>
	)
}
