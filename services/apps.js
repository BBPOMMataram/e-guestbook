import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const appSlice = createSlice({
    name: 'apps',
    initialState: {
        apps: {},
        app: {}
    },
    reducers: {
        fetchApps: (state, { payload }) => {
            state.apps = payload
        },
        setApp: (state, { payload }) => {
            state.app = payload
        },
        emptyApp: (state) => {
            state.app = {}
        }
    }
})

export const { fetchApps, setApp, emptyApp } = appSlice.actions
export default appSlice.reducer

// get apps for refetch
export function getApps(url) {
    return async (dispatch) => {
        axios.get(url)
            .then(({ data }) => {
                dispatch(fetchApps(data))
            })
            .catch(err => console.log(err))
    }
}
