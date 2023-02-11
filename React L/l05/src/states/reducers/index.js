import {createSlice} from '@reduxjs/toolkit'

const incrementSlice = createSlice({
    name:'incdec',
    initialState:0,
    reducers:{
        Inc:(state,action)=>{
            //action.payload
            return state+=1
        },
        Dec:(state,action)=>{
            return state-=1
        }
    }
})


export const {Inc,Dec} = incrementSlice.actions
export default incrementSlice.reducer