const INITIAL_STATE = {
    ideas: []
}

export const Ideas = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'LOAD_IDEAS':
            return {
                ideas: action.ideas
            }
        default:
            return state
    }
}