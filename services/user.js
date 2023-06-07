import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accessToken: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.accessToken = payload
        }
    }
})

export const { setToken } = userSlice.actions
export default userSlice.reducer