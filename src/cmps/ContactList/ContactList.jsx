
import './ContactList.scss'
import { ContactPreview } from '../ContactPreview'
import { NavLink } from 'react-router-dom'
import plus from '../../assets/img/icons/plus.png'
export function ContactList({ contacts }) {
    return (
        <div className="contact-list">
            <NavLink to="contact/edit" ><img src={plus} alt="" /></NavLink>
            <ul className="contact-list-container">
                {contacts && contacts.map(contact => <li key={contact._id} ><ContactPreview contact={contact} /></li>)}
            </ul>
        </div>
    )
}
