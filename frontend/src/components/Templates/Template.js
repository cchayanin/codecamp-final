import { Layout } from 'antd'
import SiderMenu from './SiderMenu'

export default function Template(props) {
	const { Header, Content } = Layout
	const { Component } = props

	return (
		<Layout className='template-layout'>
			<SiderMenu></SiderMenu>
			<Layout>
				<Header className='template-header'></Header>
				<Content>
					<div className='template-content'>
						<Component />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}
