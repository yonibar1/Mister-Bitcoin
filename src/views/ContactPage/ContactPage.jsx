import { Component } from 'react'
import { ContactList } from '../../cmps/ContactList'
import { ContactFilter } from '../../cmps/ContactFilter'
import { connect } from 'react-redux'
import { loadContacts } from '../../store/actions/contactActions'
import './ContactPage.scss'
class _ContactPage extends Component {
    state = {
        filterBy: null,
    }
    componentWillMount() {
        this.loadContacts()
        console.log(this.props.contacts);
    }
    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadContacts(this.state.filterBy))
    }
    loadContacts = async (filterBy) => {
        await this.props.loadContacts(filterBy);
    }

    render() {
        const { contacts } = this.props
        return (
            <div className="contact-page">
                <ContactFilter onChangeFilter={this.onChangeFilter} />
                <ContactList contacts={contacts} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactReducer.contacts,
    }
}

const mapDispatchToProps = {
    loadContacts,
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
