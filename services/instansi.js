import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const instansiSlice = createSlice({
    name: 'instansi',
    initialState: {
        item: []
    },
    reducers: {
        setItem: (state, { payload }) => {
            state.item = payload
        }
    }
})

export const { setItem } = instansiSlice.actions
export default instansiSlice.reducer

export const fetchItem = (url) => {
    return async (dispatch) => {
        axios(url)
            .then(instansi => {
                dispatch(setItem(instansi.data[0]))
            })
            .catch(err => console.log(err))
    }
}