import { configureStore } from "@reduxjs/toolkit";
import incrementSlice from "./reducers";

export default configureStore({
    reducer:{
        number:incrementSlice
    }
})