import { storageService } from '../services/storage.service'
const USER_KEY = 'user'

function signup(user) {
    storageService.store(USER_KEY, user)
}

function addMove(move) {
    const user = getUser()
    user.moves.push(move)
    user.coins -= move.amount
    storageService.store(USER_KEY, user)
}

function getUser() {
    let user = storageService.load(USER_KEY)
    return user
}
export const userService = {
    addMove,
    signup,
    getUser
}