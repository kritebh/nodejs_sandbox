import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:'counter',
    initialState:{
        value:0
    },
    reducers:{
        increaseCount:(state)=>{
            state.value += 1;
        },
        decreaseCount:(state)=>{
            state.value -= 1;
        },
        resetCount:(state)=>{
            state.value=0;
        },
        increaseCountByfive:(state)=>{
            state.value = state.value+5;
        },
        decreaseCountByfive:(state)=>{
            state.value = state.value-5;
        }
    }
})

export const {increaseCount,decreaseCount,resetCount,increaseCountByfive,decreaseCountByfive} = counterSlice.actions

export default counterSlice.reducer