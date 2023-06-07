import { configureStore } from "@reduxjs/toolkit";
import {
    sideBarReducers,
    modalProfileReducers,
    modalLoginReducers,
    userReducers,
    modalAboutReducers,
    formModalAppReducer,
    appsReducer,
    profileReducer,
    pemProduksiReducer,
    pemDistribusiReducer,
    atmReducer,
    instansiReducer,
    guestReducer,
} from "../services";


export const store = configureStore({
    reducer: {
        sideBar: sideBarReducers,
        modalProfile: modalProfileReducers,
        modalLogin: modalLoginReducers,
        user: userReducers,
        modalAbout: modalAboutReducers,
        formModalAppReducer,
        appsReducer,
        profileReducer,
        pemProduksiReducer,
        pemDistribusiReducer,
        atmReducer,
        instansiReducer,
        guestReducer,
    },
})