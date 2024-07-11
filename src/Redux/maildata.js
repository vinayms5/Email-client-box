import { createSlice } from "@reduxjs/toolkit";
const initialState ={maildata:[],archivedata:[],isdelete:false,isarchive:false}
const maildataSlice=createSlice({
    name:"maildata",
    initialState,
    reducers:{

        addalldata(state,action){
state.maildata=action.payload
        },
        archivedata(state,action){
            console.log(action.payload)
           state.archivedata.push(action.payload)
        },
        deletedata(state,action){
            state.maildata=action.payload
        
            
        },
        archideletedata(state,action){
             state.archivedata=action.payload
        },
        isdeletehandler(state){
            state.isdelete=!state.isdelete
        },
        isarchivedata(state){
            state.isarchive=!state.isarchive
        },
        markdata(state,action){

        },
        allarchive(state,action){
            state.archivedata=action.payload
        }
       
    }

})
export const maildatasliceaction=maildataSlice.actions
export default maildataSlice