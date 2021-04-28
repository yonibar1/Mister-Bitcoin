
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransferFund } from '../../cmps/TransferFund'
import { MoveList } from '../../cmps/MoveList'
import { getContactById } from '../../store/actions/contactActions'
import { addMove } from '../../store/actions/userActions'
import back from '../../assets/img/icons/back.png'
import edit from '../../assets/img/icons/edit.png'


import './ContactDetails.scss'

class _ContactDetails extends Component {
    state = {
        moves: [],
    }
    async componentDidMount() {
        await this.loadContact(this.props.match.params.id)
        this.loadMoves()
        console.log(this.props.user);
    }
    loadContact = async (id) => {
        await this.props.getContactById(id)
    }
    async onEditContact() {
        const { contact } = this.props
        this.props.history.push('/contact/edit/' + contact._id)
    }
    loadMoves = () => {
        const { user, contact } = this.props
        if (!user || !contact) return
        const moves = user.moves.filter(move => {
            return move.toId === contact._id
        })
        if (!moves.length) return
        this.setState({ moves }, () => this.loadMoves)
    }

    onTransferCoins = async (ev, amount) => {
        ev.preventDefault()
        const move = await this.props.addMove(this.props.contact, amount)
        this.setState((prevState) => ({ moves: [...prevState.moves, move] }), () => {
            console.log(this.state.moves);
        })
    }

    render() {
        const { contact, user } = this.props
        const { moves } = this.state
        if (!contact) return <h2>Loading..</h2>
        return (
            <div className="contact-details">
                <div className="actions">
                    <NavLink to="/contact"><img src={back} alt="" /></NavLink>
                    <button onClick={() => this.onEditContact()} ><img src={edit} alt="" /></button>
                </div>
                <div className="contact-details-container">
                    <img src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
                    <p><span>Name</ span>: {contact.name}</p>
                    <p><span>Email</ span>: {contact.email}</p>
                    <p><span>Phone</ span>: {contact.phone}</p>
                </div>
                <TransferFund maxCoins={user.coins} onTransferCoins={this.onTransferCoins} contact={contact} />
                {(moves.length && moves) ? <MoveList isHome={false} moves={moves} /> : <div></div>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        contact: state.contactReducer.currContact,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    getContactById,
    addMove
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
