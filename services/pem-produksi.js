import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const profileSlice = createSlice({
    name: 'pem-produksi',
    initialState: {
        items: [],
        item: {},
        isFormPemProduksiModalOpened: false,
    },
    reducers: {
        setItems: (state, { payload }) => {
            state.items = payload
        },
        toggleFormPemProduksiModal: (state) => {
            state.isFormPemProduksiModalOpened = !state.isFormPemProduksiModalOpened
        },
        setItem: (state, { payload }) => {
            state.item = payload
        }
    }
})

export const { setItems, setItem, toggleFormPemProduksiModal } = profileSlice.actions
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