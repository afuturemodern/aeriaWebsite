import * as types from "../types"

export const setInfo = (name) => ({
    type: types.ACTIVE_TOGGLE,
    payload: name,
})