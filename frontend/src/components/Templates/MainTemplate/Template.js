import { Layout } from 'antd'
import SiderMenu from './SiderMenu'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import LocalStorageService from '../../../services/localStorageService'

export default function Template(props) {
	const { Header, Content } = Layout
	const { Component } = props
	const [userName, setUserName] = useState('')

	useEffect(() => {
		const token = LocalStorageService.getToken()
		if (token) {
			const user = jwtDecode(token)
			setUserName(user.name)
		}
	}, [])

	return (
		<Layout className='template-layout'>
			<SiderMenu setRole={props.setRole}></SiderMenu>
			<Layout>
				<Header className='template-header'>{`Hi, ${userName}`}</Header>
				<Content>
					<div className='template-content'>
						<Component />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}
