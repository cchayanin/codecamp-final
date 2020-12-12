import { Switch, Redirect, Route } from 'react-router-dom'
import ConfigRole from '../../configs/roles'

import { connect } from 'react-redux'

function PrivateRoute(props) {
	const role = props.role

	const allowedRoutes = ConfigRole[role].allowedRoutes
	const redirectRoutes = ConfigRole[role].redirectRoutes

	return (
		<Switch>
			{allowedRoutes.map((route) => {
				return (
					<Route
						exact
						path={route.url}
						key={route.url}
						component={route.component}
					/>
				)
			})}
			<Redirect to={redirectRoutes} />
		</Switch>
	)
}

const mapStateToProps = (state) => {
	return {
		role: state.role,
	}
}

export default connect(mapStateToProps, null)(PrivateRoute)
