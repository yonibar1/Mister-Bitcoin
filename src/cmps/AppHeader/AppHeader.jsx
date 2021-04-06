// import logo from '../../assets/img/logo.png'
// import { NavLink, withRouter } from 'react-router-dom'
import { NavLink} from 'react-router-dom'
import { Component } from 'react'

import './AppHeader.scss'

export class AppHeader extends Component {

    render() {
        return (
            <div className="app-header">
                {/* <img className="logo" src={logo} alt=""/> */}
                <h2>Mr Bitcoin</h2>
                    <ul>
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink exact to="/contact">Contacts</NavLink></li>
                        <li><NavLink exact to="/statistic">Statistics</NavLink></li>
                    </ul>
            </div>
        )
    }
}
