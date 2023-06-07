import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../config/axios";

const atmSlice = createSlice({
    name: "atm",
    initialState: {
        items: [],
        item: [],
        atmBankNames: [],
        isFormAtmModalOpened: false,
    },
    reducers: {
        setItems: (state, { payload }) => {
            state.items = payload
        },
        setItem: (state, { payload }) => {
            state.item = payload
        },
        toggleFormAtmModal: (state) => {
            state.isFormAtmModalOpened = !state.isFormAtmModalOpened
        },
        setBankNamesFilter: (state, { payload }) => {
            state.atmBankNames = payload
        }
    }
})

export const { setItems, setItem, setBankNamesFilter, toggleFormAtmModal } = atmSlice.actions
export default atmSlice.reducer

const fetchAtm = (url) => (
    async (dispatch) => {
        axios(url)
            .then(res => {
                const atm = res.data
                dispatch(setItems(atm))

                if (!atm.data) {
                    // set bank names for filter
                    const atmBankNames = [...new Set(atm.map(atm => atm.bankName))]
                    atmBankNames.unshift('All')
                    dispatch(setBankNamesFilter(atmBankNames))
                }
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err)
            })
    }
)

const fetchAtmByName = (name) => (
    async (dispatch) => {
        const atm = await axios(`atm/bank/${name}`)
            .then(res => res.data)
            .catch(err => console.log(err))

        dispatch(setItems(atm))
    }
)

const emptyAtm = () => (dispatch) => dispatch(setItems([]))

export { fetchAtm, fetchAtmByName, emptyAtm }