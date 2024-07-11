import { createSlice } from "@reduxjs/toolkit";
const initialState ={searchdata:""}
const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        filterhandler(state,action){
           state.searchdata=action.payload
        },
       
    }

})
export const searchsliceaction=searchSlice.actions
export default searchSlice