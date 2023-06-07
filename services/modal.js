import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalProfileOpened: false,
    textHeader: '',
    textContent: '',
}

export const modalProfileSlice = createSlice({
    name: 'modalProfile',
    initialState,
    reducers: {
        toggleModalProfile: (state, action) => {
            state.isModalProfileOpened = !state.isModalProfileOpened
            if (state.isModalProfileOpened) {
                state.textHeader = action.payload.textHeader
                state.textContent = action.payload.textContent
            }
        }
    }
})

export const { toggleModalProfile } = modalProfileSlice.actions
export default modalProfileSlice.reducer