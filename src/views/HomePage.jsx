import { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import coins from '../assets/img/icons/coins.png'
import bitcoin from '../assets/img/icons/bitcoin.png'
import defaultUser from '../assets/img/defaultUser.png'
// import hero from '../assets/img/hero.jpg'

export class HomePage extends Component {
    state = {
        user: null,
        bitcoinRate: null,
    }
    componentWillMount() {
        this.loadUser()
    }
    loadUser = () => {
        const user = userService.getUser()
        this.setState({ user }, () => {
            this.getBitcoinRate()
        })
    }
    getBitcoinRate = async () => {
        const bitcoinRate = await bitcoinService.getRate(this.state.user.coins)
        this.setState({ bitcoinRate })
    }
    get coinsForDisplay(){
        if(!this.state.bitcoinRate) return 0
        return (this.state.user.coins/this.state.bitcoinRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    render() {
        const { user, bitcoinRate, contacts } = this.state
        return (
            <div className="home-page">
            <div className="user-details">
                <h4><img src={defaultUser} alt=""/>Hello {user.name}</h4>
                <h4><img src={coins} alt=""/> Coins: {this.coinsForDisplay}</h4>
                <h4><img src={bitcoin} alt=""/>BTC: {bitcoinRate}</h4>
            </div>
            </div>
        )
    }
}