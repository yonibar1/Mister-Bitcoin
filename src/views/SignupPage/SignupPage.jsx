
import { Component } from 'react'
import { connect } from 'react-redux'
import { signup, loadUser } from '../../store/actions/userActions'
import bitcoin from '../../assets/img/icons/bitcoin.png'
import './SignupPage.scss'

class _SignupPage extends Component {
    state = {
        name: ''
    }

    async componentDidMount() {
        const user = await this.props.loadUser()
        if (user) this.props.history.push('/home')
    }

    signup = async (ev) => {
        ev.preventDefault()
        await this.props.signup(this.state.name)
        this.props.history.push('/home')
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value })
    }

    render() {
        const { name } = this.state
        return (
            <div className="signup-page">
                <img src={bitcoin} alt="" />
                <h1>Please enter your name</h1>
                <form onSubmit={(ev) => this.signup(ev)}>
                    <input placeholder="Name" type="text" value={name} onChange={this.handleChange} name="name" />
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signup, loadUser
}
const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)

