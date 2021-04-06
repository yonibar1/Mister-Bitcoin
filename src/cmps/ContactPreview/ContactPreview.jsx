import './ContactPreview.scss'
import { NavLink} from 'react-router-dom'

export function ContactPreview({ contact, onShowContact }) {
    return (
            <NavLink exact to={"contact/details/" + contact._id}>
        <div className="contact-preview">
            <img src={`https://robohash.org/${contact._id}`} alt="" />
            <div className="preview-details">
            <p class="name">{contact.name}</p>
            <p>Phone: {contact.phone}</p>
            </div>
        </div>
            </NavLink>
    )
}