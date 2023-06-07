import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        items: [],
        item: {},
        isFormProfileModalOpened: false,
    },
    reducers: {
        setItems: (state, { payload }) => {
            state.items = payload
        },
        toggleFormModal: (state) => {
            state.isFormProfileModalOpened = !state.isFormProfileModalOpened
        },
        setItem: (state, { payload }) => {
            state.item = payload
        }
    }
})

export const { setItems, setItem, toggleFormModal } = profileSlice.actions
export default profileSlice.reducer

export function fetchItems(url) {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(url)
            dispatch(setItems(data))
        } catch (err) {
            console.log(err)
        }

    }
}