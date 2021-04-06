import { Component } from 'react'
import { ContactList } from '../../cmps/ContactList'
import { ContactFilter } from '../../cmps/ContactFilter'
import { ContactDetails } from '../ContactDetails/ContactDetails'
import contactService from '../../services/contact.service'
import './ContactPage.scss'
export class ContactPage extends Component {
    state={
        contacts:null,
        filterBy:null,
        contactId: null,
    }
    componentWillMount() {
        this.loadContacts()    
    }
    onChangeFilter = (filterBy)=>{
        this.setState({ filterBy }, () => this.loadContacts())
    }
    loadContacts = async () => {
        const contacts = await contactService.getContacts(this.state.filterBy)
        this.setState({ contacts })
    }
    
    render() {
        const {contacts} = this.state
        return (
            <div className="contact-page">
                <ContactFilter onChangeFilter={this.onChangeFilter} />
                <ContactList contacts={contacts} />
            </div>
        )
    }
}
