import { configureStore } from "@reduxjs/toolkit";
import {
    guestReducer,
} from "../services";


export const store = configureStore({
    reducer: {
        guestReducer,
    },
})