import { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import coins from '../assets/img/icons/coins.png'
import bitcoin from '../assets/img/icons/bitcoin.png'
import defaultUser from '../assets/img/defaultUser.png'
import { signup } from '../store/actions/userActions'
import { connect } from 'react-redux'
import { MoveList } from '../cmps/MoveList'
class _HomePage extends Component {
    state = {
        bitcoinRate: null,
    }
    async componentDidMount() {
        await this.loadUser()
    }
    async loadUser() {
        const user = this.props.user
        if (!user) this.props.history.push('/')
        else {
            this.getBitcoinRate()
        }
    }

    getBitcoinRate = async () => {
        const bitcoinRate = await bitcoinService.getRate(this.props.user.coins)
        this.setState({ bitcoinRate })
    }
    get coinsForDisplay() {
        if (!this.state.bitcoinRate) return 0
        return (this.props.user.coins / this.state.bitcoinRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    render() {
        const { bitcoinRate } = this.state
        const { user } = this.props
        if (!user) return <div>Log in</div>
        return (
            <div className="home-page">
                <div className="user-details">
                    <h4><img src={defaultUser} alt="" />Hello {user.name}</h4>
                    <h4><img src={coins} alt="" /> Dollars: {this.coinsForDisplay} ({user.coins} BTC)</h4>
                    <h4><img src={bitcoin} alt="" />BTC: {bitcoinRate}</h4>
                    {user.moves.length && <MoveList isHome={true} moves={user.moves.slice(0, 3)} />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = {
    signup,
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps, null)(_HomePage)
