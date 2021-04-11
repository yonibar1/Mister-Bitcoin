
import { Component } from 'react'
import { connect } from 'react-redux'
import { addMove } from '../../store/actions/userActions'
import { withRouter } from 'react-router-dom'
import './TransferFund.scss'

class _TransferFund extends Component {
    state = {
        amount: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = +target.value
        this.setState({ [field]: value })
    }

    render() {
        const { contact, maxCoins } = this.props
        const { amount } = this.state
        return (
            <div className='transfer-fund'>
                <h2>Transfers Coins to {contact.name} </h2>
                <form onSubmit={(ev) => this.props.onTransferCoins(ev, amount)}>
                    <input type="number" max={maxCoins} value={amount} onChange={this.handleChange} name="amount" />
                    <button>Transfer</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addMove,
}

export const TransferFund = connect(null, mapDispatchToProps)(withRouter(_TransferFund))

