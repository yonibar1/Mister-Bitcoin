const INITIAL_STATE = {
    user: null
}
export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: { ...state.user, coins: state.user.coins -= action.move.amount, moves: [...state.user.moves, action.move] }
            }
        case 'SIGNUP':
            return {
                ...state,
                user: action.user
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}