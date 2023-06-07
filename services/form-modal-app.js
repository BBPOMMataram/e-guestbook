import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isFormModalAppOpened: false,
}

export const modalLoginSlice = createSlice({
    name: 'formModalApp',
    initialState,
    reducers: {
        toggleFormModalApp: (state) => {
            state.isFormModalAppOpened = !state.isFormModalAppOpened
        }
    }
})

export const { toggleFormModalApp } = modalLoginSlice.actions
export default modalLoginSlice.reducer