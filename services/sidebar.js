import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideBarOpen: false,
    randomColor: true
}

export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        toggleSideBar: (state) => { state.isSideBarOpen = !state.isSideBarOpen },
        toggleColor: (state) => { state.randomColor = Math.random() < 0.5 }
    }
})

export const { toggleSideBar, toggleColor } = sideBarSlice.actions

export default sideBarSlice.reducer