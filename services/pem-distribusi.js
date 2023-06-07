import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const profileSlice = createSlice({
    name: 'pem-distribusi',
    initialState: {
        items: [],
        item: {},
        isFormPemDistribusiModalOpened: false,
    },
    reducers: {
        setItems: (state, { payload }) => {
            state.items = payload
        },
        toggleFormPemDistribusiModal: (state) => {
            state.isFormPemDistribusiModalOpened = !state.isFormPemDistribusiModalOpened
        },
        setItem: (state, { payload }) => {
            state.item = payload
        }
    }
})

export const { setItems, setItem, toggleFormPemDistribusiModal } = profileSlice.actions
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