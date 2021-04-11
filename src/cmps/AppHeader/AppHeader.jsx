import logo from '../../assets/img/logo-try.webp'
// import { NavLink, withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { signup, loadUser } from '../../store/actions/userActions'
import { withRouter } from 'react-router-dom'
import './AppHeader.scss'

class _AppHeader extends Component {
    componentDidMount() {
        this.loadUser()
    }
    async loadUser() {
        const user = await this.props.loadUser()
        if (!user) this.props.history.push('/')
    }

    render() {
        if (!this.props.user) return <div className="app-header">
            <img className="logo" src={logo} alt="" />
            <ul>
                <li><NavLink exact to="/signup">Signup</NavLink></li>
            </ul>
        </div>
        return (
            <div className="app-header">
                {/* <img className="logo" src={logo} alt=""/> */}
                {/* <h2>Mr Bitcoin</h2> */}
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li><NavLink exact to="/home">Home</NavLink></li>
                    <li><NavLink exact to="/contact">Contacts</NavLink></li>
                    <li><NavLink exact to="/statistic">Statistics</NavLink></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    signup, loadUser
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))
