import { LogoutOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import LocalStorageService from '../../../services/localStorageService'
import { connect } from 'react-redux'

function HeaderBar(props) {
	const [userName, setUserName] = useState('')

	const onClickLogout = () => {
		LocalStorageService.removeToken()
		props.onLogout('guest')
	}

	const content = (
		<div>
			<Button icon={<LogoutOutlined />} type='text' onClick={onClickLogout}>
				ออกจากระบบ
			</Button>
		</div>
	)

	useEffect(() => {
		const token = LocalStorageService.getToken()
		if (token) {
			const user = jwtDecode(token)
			setUserName(user.name)
		}
	}, [])

	return (
		<div>
			<Popover content={content} trigger='hover' placement='bottom'>
				<span>{`Hi, ${userName} `}</span>
			</Popover>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: (value) => {
			dispatch({ type: 'SET_ROLE', payload: value })
		},
	}
}

export default connect(null, mapDispatchToProps)(HeaderBar)
