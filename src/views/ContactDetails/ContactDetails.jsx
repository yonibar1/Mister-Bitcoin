
import { Component } from 'react'
import contactService from '../../services/contact.service'
import {NavLink} from 'react-router-dom'
import back from '../../assets/img/icons/back.png'
import edit from '../../assets/img/icons/edit.png'


import './ContactDetails.scss'

export class ContactDetails extends Component {
    state = {
        contact: null
    }
    componentWillMount() {
        this.loadContact(this.props.match.params.id)
    }
    loadContact = async (id) => {
        const contact = await contactService.getContactById(id)
        this.setState({ contact })
    }
    async onEditContact(){
        const {contact} = this.state
        this.props.history.push('/contact/edit/' + contact._id)
    }

    render() {
        const { contact } = this.state
        if (!contact) return <h2>Loading..</h2>
        return (
            <div className="contact-details">
                    <div className="actions">
                        <button onClick={() => this.onEditContact()} ><img src={edit} alt=""/></button>
                        <NavLink to="/contact"><img src={back} alt=""/></NavLink>
                    </div>
                    <div className="contact-details-container">
                    <img src={`https://robohash.org/${contact._id}`} alt="" />
                    <p><span>Name</ span>: {contact.name}</p>
                    <p><span>Email</ span>: {contact.email}</p>
                    <p><span>Phone</ span>: {contact.phone}</p>
                    </div>
            </div>
        )
    }
}
