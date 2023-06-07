import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalLoginOpened: false,
}

export const modalLoginSlice = createSlice({
    name: 'modalLogin',
    initialState,
    reducers: {
        toggleModalLogin: (state) => {
            state.isModalLoginOpened = !state.isModalLoginOpened
        }
    }
})

export const { toggleModalLogin } = modalLoginSlice.actions
export default modalLoginSlice.reducer