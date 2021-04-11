import './ContactPreview.scss'
import { NavLink } from 'react-router-dom'

export function ContactPreview({ contact }) {
    return (
        <NavLink exact to={"contact/details/" + contact._id}>
            <div className="contact-preview">
                <img src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
                <div className="preview-details">
                    <p className="name">{contact.name}</p>
                    <p>Phone: {contact.phone}</p>
                </div>
            </div>
        </NavLink>
    )
}