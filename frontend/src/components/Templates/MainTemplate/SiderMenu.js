import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

export default function SiderMenu() {
	const { Sider } = Layout
	const { SubMenu } = Menu

	return (
		<Sider>
			<Menu theme='dark' mode='inline'>
				<SubMenu key='bi' title='ข้อมูลพื้นฐาน'>
					<Menu.Item key='bi01'>
						<Link to='/user'>บันทึกข้อมูลผู้ใช้งาน</Link>
					</Menu.Item>
				</SubMenu>
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
		</Sider>
	)
}
