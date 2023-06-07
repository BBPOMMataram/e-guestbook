import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalAboutOpened: false,
    textHeader: 'About',
    textContent: '',
}

export const modalAboutSlice = createSlice({
    name: 'modalAbout',
    initialState,
    reducers: {
        toggleModalAbout: (state, action) => {
            state.isModalAboutOpened = !state.isModalAboutOpened
        }
    }
})

export const { toggleModalAbout } = modalAboutSlice.actions
export default modalAboutSlice.reducer