import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Course from './pages/Course'
import Person from './pages/Person'
import Register from './pages/Register'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/user' component={User} />
				<Route exact path='/course' component={Course} />
				<Route exact path='/person' component={Person} />
				<Route exact path='/register' component={Register} />
				<Redirect to='/' />
			</Switch>
		</div>
	)
}

export default App
