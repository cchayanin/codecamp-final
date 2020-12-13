import { Layout } from 'antd'
import SiderMenu from './SiderMenu'
import HeaderContent from './HeaderBar'

export default function Template(props) {
	const { Header, Content } = Layout
	const { ContentComponent } = props

	return (
		<Layout className='template-layout'>
			<SiderMenu setRole={props.setRole}></SiderMenu>
			<Layout>
				<Header className='template-header'>
					<HeaderContent />
				</Header>
				<Content>
					<div className='template-content'>
						<ContentComponent />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}
