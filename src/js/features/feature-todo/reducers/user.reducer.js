export const initialState = {
    list: [],
}

/**
 * Actions
 */

export const SET_LIST = 'setList@users'

export const setList = (users) => ({
    type: SET_LIST,
    payload: { users },
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LIST]: (state, { payload }) => ({
        ...state,
        list: payload.users,
    }),
}

export default (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}
