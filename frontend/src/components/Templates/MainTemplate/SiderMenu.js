import { Layout, Menu, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import LocalStorageService from '../../../services/localStorageService'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import {
	FileAddOutlined,
	HomeOutlined,
	LogoutOutlined,
	SettingOutlined,
} from '@ant-design/icons'

function SiderMenu(props) {
	const { Sider } = Layout
	const { SubMenu } = Menu

	const menu = {
		placement: 'right',
		system: {
			bi: {
				key: 'bi',
				title: 'ข้อมูลพื้นฐาน',
				program: {
					bi01: { key: 'bi01', title: 'บันทึกข้อมูลผู้ใช้งาน' },
				},
			},
			cr: {
				key: 'cr',
				title: 'ระบบลงทะเบียนการอบรม',
				program: {
					cr01: { key: 'cr01', title: 'บันทึกข้อมูลการอบรม' },
					cr02: { key: 'cr02', title: 'บันทึกข้อมูลผู้เข้าอบรม' },
					cr03: { key: 'cr03', title: 'บันทึกข้อมูลการลงทะเบียน' },
				},
			},
		},
	}

	const token = LocalStorageService.getToken()
	const user = jwtDecode(token)

	const onClickLogout = () => {
		LocalStorageService.removeToken()
		props.onLogout('guest')
	}

	return (
		<Sider width='230px'>
			<Menu theme='dark' mode='inline' forceSubMenuRender={true}>
				<Menu.Item icon={<HomeOutlined />}>
					<Link to='/'>หน้าแรก</Link>
				</Menu.Item>

				{user.is_admin === true ? (
					<SubMenu
						key={menu.system.bi.key}
						title={menu.system.bi.title}
						icon={<SettingOutlined />}
					>
						<Menu.Item key={menu.system.bi.program.bi01.key}>
							<Tooltip
								placement={menu.placement}
								title={menu.system.bi.program.bi01.title}
							>
								<Link to='/user' replace>
									{menu.system.bi.program.bi01.title}
								</Link>
							</Tooltip>
						</Menu.Item>
					</SubMenu>
				) : null}

				<SubMenu
					key={menu.system.cr}
					title='ระบบลงทะเบียนการอบรม'
					icon={<FileAddOutlined />}
				>
					<Menu.Item key={menu.system.cr.program.cr01.key}>
						<Tooltip
							placement={menu.placement}
							title={menu.system.cr.program.cr01.title}
						>
							<Link to='/course'>{menu.system.cr.program.cr01.title}</Link>
						</Tooltip>
					</Menu.Item>

					<Menu.Item key={menu.system.cr.program.cr02.key}>
						<Tooltip
							placement={menu.placement}
							title={menu.system.cr.program.cr02.title}
						>
							<Link to='/person'>{menu.system.cr.program.cr02.title}</Link>
						</Tooltip>
					</Menu.Item>
					<Menu.Item key={menu.system.cr.program.cr03.key}>
						<Tooltip
							placement={menu.placement}
							title={menu.system.cr.program.cr03.title}
						>
							<Link to='/register'>{menu.system.cr.program.cr03.title}</Link>
						</Tooltip>
					</Menu.Item>
				</SubMenu>
			</Menu>
			<Menu theme='dark' className='logout-menu'>
				<Menu.Item onClick={onClickLogout} icon={<LogoutOutlined />}>
					ออกจากระบบ
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: (value) => {
			dispatch({ type: 'SET_ROLE', payload: value })
		},
	}
}

export default connect(null, mapDispatchToProps)(SiderMenu)
