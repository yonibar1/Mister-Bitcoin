import { userService } from '../../services/user.service'

export function signup(name) {
    return async dispatch => {
        const user = {
            name,
            coins: 100,
            moves: []
        }
        await userService.signup(user)
        dispatch({ type: 'SIGNUP', user })
    }
}

export function addMove(contact, amount) {
    return async dispatch => {
        const move = {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
        await userService.addMove(move)
        dispatch({ type: 'UPDATE_USER', move })
        return move
    }
}

export function loadUser() {
    return async dispatch => {
        const user = await userService.getUser()
        dispatch({ type: 'SET_USER', user })
        return user
    }
}