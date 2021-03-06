
import { React, Component } from 'react'
import contactService from '../../services/contact.service'
import remove from '../../assets/img/icons/delete.png'
import { connect } from 'react-redux'
import { saveContact, removeContact } from '../../store/actions/contactActions'
import back from '../../assets/img/icons/back.png'

import './ContactEdit.scss'

class _ContactEdit extends Component {
    state = {
        contact: null
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const contact = id ? await contactService.getContactById(id) : await contactService.getEmptyContact()
        this.setState({ contact })
    }
    async saveContact(ev) {
        ev.preventDefault()
        await this.props.saveContact(this.state.contact)
        this.props.history.push('/contact')
    }
    handleChange = ({ target }) => {

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }), () => {
            console.log(this.state.contact);
        })
    }
    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
    onBack() {
        const { id } = this.props.match.params
        if (!id) this.props.history.push('/contact')
        else this.props.history.push(`/contact/details/${id}`)
    }
    async onRemoveContact() {
        const { contact } = this.state
        await this.props.removeContact(contact._id)
        this.props.history.push('/contact')
    }


    render() {
        const { contact } = this.state
        if (!contact) return (<div>Loading..</div>)
        const { name, email, phone } = contact
        return (
            <div className="contact-edit">
                <div className="actions">
                    <button onClick={() => this.onBack()}><img src={back} alt="" /></button>
                    {contact._id && <button onClick={() => this.onRemoveContact()}><img src={remove} alt="" /></button>}
                </div>
                <img className="contact-img" src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
                <form onSubmit={(ev) => this.saveContact(ev)}>
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" id="name" value={name} onChange={this.handleChange} />
                    <label htmlFor="email">Email </label>
                    <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
                    <label htmlFor="phone">Phone </label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={this.handleChange} />
                    <button>Save Contact</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = {
    saveContact,
    removeContact
}

export const ContactEdit = connect(null, mapDispatchToProps)(_ContactEdit)

