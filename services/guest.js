import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const guestSlice = createSlice({
    name: 'guest',
    initialState: {
        id: "",
        name: "",
        fromInstansi: "",
        hp: "",
        service: "",
        image: null,
        address: "",
        email: "",
        pangkat: "",
        jabatan: "",

        itemsSijelapp: [],
        items: [],
        isGuestModalFormOpenned: false,
        isShowFullImage: false,
    },
    reducers: {
        setImage: (state, { payload }) => {
            state.image = payload
        },
        setName: (state, { payload }) => {
            state.name = payload
        },
        setFromInstansi: (state, { payload }) => {
            state.fromInstansi = payload
        },
        setHp: (state, { payload }) => {
            state.hp = payload
        },
        setService: (state, { payload }) => {
            state.service = payload
        },
        setAddress: (state, { payload }) => {
            state.address = payload
        },
        setEmail: (state, { payload }) => {
            state.email = payload
        },
        setPangkat: (state, { payload }) => {
            state.pangkat = payload
        },
        setJabatan: (state, { payload }) => {
            state.jabatan = payload
        },

        setItemsSijelapp: (state, { payload }) => {
            state.itemsSijelapp = payload
        },
        setItems: (state, { payload }) => {
            state.items = payload
        },

        toggleGuestModalForm: (state) => {
            state.isGuestModalFormOpenned = !state.isGuestModalFormOpenned
        },

        setId: (state, { payload }) => {
            state.id = payload
        },
        emptyGuestStates: (state) => {
            state.id = "",
                state.name = "",
                state.fromInstansi = "",
                state.hp = "",
                state.service = "",
                state.address = "",
                state.email = "",
                state.pangkat = "",
                state.jabatan = "",
                state.image = null
        },

        setGuestStates: (state, { payload }) => {
            state.fromInstansi = payload.fromInstansi,
                state.hp = payload.hp,
                state.service = payload.service,
                state.address = payload.address,
                state.email = payload.email,
                state.pangkat = payload.pangkat,
                state.jabatan = payload.jabatan
        },

        toggleIsShowFullImage: (state) => {
            state.isShowFullImage = !state.isShowFullImage
        }
    }
})

export const { setGuestStates, toggleIsShowFullImage, emptyGuestStates, setId, toggleGuestModalForm, setItems, setImage, setName, setFromInstansi, setHp, setService, setItemsSijelapp, setAddress, setEmail, setJabatan, setPangkat } = guestSlice.actions
export default guestSlice.reducer

export function getAllGuestSijelapp() {
    return async (dispatch) => {
        axios('guest-sijelapp')
            .then(({ data }) => {
                dispatch(setItemsSijelapp(data));
            })
            .catch(err => console.log(err))
    }
}

export function fetchGuests(url) {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(url)
            dispatch(setItems(data))
        } catch (err) {
            console.log(err)
        }

    }
}