import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import LocalStorageService from '../../../services/localStorageService'
import { connect } from 'react-redux'

function SiderMenu(props) {
	const { Sider } = Layout
	const { SubMenu } = Menu

	const onClickLogout = () => {
		LocalStorageService.removeToken()
		props.onLogout('guest')
	}
	return (
		<Sider>
			<Menu theme='dark' mode='inline'>
				{props.role === 'admin' ? (
					<SubMenu key='bi' title='ข้อมูลพื้นฐาน'>
						<Menu.Item key='bi01'>
							<Link to='/user'>บันทึกข้อมูลผู้ใช้งาน</Link>
						</Menu.Item>
					</SubMenu>
				) : null}
				<SubMenu key='cr' title='ระบบลงทะเบียนการอบรม'>
					<Menu.Item key='cr01'>
						<Link to='/course'>บันทึกข้อมูลการอบรม</Link>
					</Menu.Item>
					<Menu.Item key='cr02'>
						<Link to='/person'>บันทึกข้อมูลผู้เข้าอบรม</Link>
					</Menu.Item>
					<Menu.Item key='cr03'>
						<Link to='/register'>บันทึกข้อมูลการลงทะเบียน</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
			<Menu theme='dark'>
				<Menu.Item onClick={onClickLogout}>Logout</Menu.Item>
			</Menu>
		</Sider>
	)
}

const mapStateToProps = (state) => {
	return {
		role: state.role,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: (value) => {
			dispatch({ type: 'SET_ROLE', payload: value })
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)
