import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'users',
    initialState:{
        users:[]
    },
    reducers:{
        addUsers:(state,action)=>{
            state.users = action.payload
        }
    }
})

export const {addUsers} = UserSlice.actions
export default UserSlice.reducer;