import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./CounterSlice"
import UserSlice from "./UserSlice"

const store = configureStore({
    reducer:{
        counter:CounterSlice,
        users:UserSlice
    }
});

export default store