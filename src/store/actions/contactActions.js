import contactService from '../../services/contact.service'

// Thunk - Action Dispatcher
export function loadContacts(filterBy) {
    return async dispatch => {
        const contacts = await contactService.getContacts(filterBy)
        const action = {
            type: 'SET_CONTACTS',
            contacts
        }
        dispatch(action)
    }
}

export function getContactById(contactId) {
    return async (dispatch, getState) => {
        // const contacts = getState().contactReducer.contacts
        // const contact = contacts.find(c => {
        //     return c._id === contactId
        // })
        const contact = await contactService.getContactById(contactId)
        dispatch({ type: 'SET_CONTACT', contact })
    }
}
export function saveContact(contact) {
    return async dispatch => {
        const isAdd = !contact._id
        const updatedContact = await contactService.saveContact(contact)

        if (isAdd) dispatch({ type: 'ADD_CONTACT', contact: updatedContact })
        else dispatch({ type: 'UPDATE_CONTACT', updatedContact })
    }
}
// export function tryContact(contactId) {
//     return async dispatch => {
//         const updatedContact = await contactService.tryContact(contactId)
//         dispatch({ type: 'SET_CONTACT', contact: updatedContact })
//     }
// }
// export function chargeContact(contactId, chargeAmount) {
//     return async (dispatch, getState) => {
//         const spendAmount = chargeAmount * 0.5

//         const userBalance = getState().userReducer.user.balance
//         if (userBalance < spendAmount) return alert('Not enough balance!')

//         const updatedContact = await contactService.chargeContact(contactId, chargeAmount)
//         dispatch({ type: 'SPEND_BALANCE', spendAmount })
//         dispatch({ type: 'SET_CONTACT', contact: updatedContact })
//     }
// }
export function removeContact(contactId) {
    return async dispatch => {
        await contactService.deleteContact(contactId)
        dispatch({ type: 'REMOVE_CONTACT', contactId })
    }
}