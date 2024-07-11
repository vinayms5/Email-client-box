import React, { useEffect, useState } from 'react'
import MarkunreadIcon from '@mui/icons-material/Markunread';

import { Box,Button,Container,Grid, ListItem } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from '@mui/material/Tooltip';

import ArchiveIcon from '@mui/icons-material/Archive';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { maildatasliceaction } from '../../Redux/maildata';

const Icons = (props) => {
const dispatch=useDispatch()
    const deleteemails=(item)=>{
        
        const gmail=localStorage.getItem("gmail")
        const congmail=gmail.replace(/@|\.com/g, '')
        
        
        axios.delete(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/get${congmail}/${item.key}.json`)
        .then(res=>{
           
        const data=props.filterdata.filter((ele)=>ele.key!==item.key)
        console.log(item)
        console.log(data,"datatata")
        dispatch(maildatasliceaction.deletedata([...data]))
        dispatch(maildatasliceaction.isdeletehandler())
        setTimeout(()=>{
            dispatch(maildatasliceaction.isdeletehandler())
        },2000)
       
       
          }).catch(err=>console.log(err.message))
      }
      const artchievedata=(item)=>{
console.log("archive button presed")
        const gmail=localStorage.getItem("gmail")
        const congmail=gmail.replace(/@|\.com/g, '')
        
        
        axios.delete(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/get${congmail}/${item.key}.json`)
        .then(res=>{
           
        const data=props.filterdata.filter((ele)=>ele.key!==item.key)
        dispatch(maildatasliceaction.deletedata([...data]))
        axios.post(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/archive${congmail}.json`,item)
          .then(res=>{
            console.log("imam darshan kb") 
            dispatch(maildatasliceaction.archivedata(item))})
            dispatch(maildatasliceaction.isarchivedata())
        setTimeout(()=>{
            dispatch(maildatasliceaction.isarchivedata())
        },[3000])
          }).catch(err=>console.log(err.message))


      }
      const maildata=useSelector(state=>state.mail.maildata) 
      const readhandler=(item)=>{
        
const gmail=localStorage.getItem("gmail")
const congmail=gmail.replace(/@|\.com/g, '')
    axios.put(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/get${congmail}/${item.key}.json`,{...item,isseen:!item.isseen})
       .then(res=>{
        const changeddata={...item,isseen:!item.isseen}
        const findindex=maildata.findIndex(i=>i.key===item.key)
        const addeddata=[...maildata]
        addeddata[findindex]=changeddata
        dispatch(maildatasliceaction.addalldata(addeddata))
        console.log(addeddata,"i am kb")
        }).catch(err=>console.log(err.message))
      }
     
  return (
    <div>
      <Grid item
              sx={{
                display:"flex"
              }} > 
                        <Grid>
                            
                            <IconButton aria-label="delete" sx={{display:{xs:"none",md:"block"}}} 
                            onClick={(e)=>
                           { artchievedata(props.items)
              
              e.stopPropagation()}}>
                <Tooltip title="Archive"> 
                <ArchiveIcon/>
                </Tooltip>
                        </IconButton>
                      
                        </Grid>
                        <Grid> <IconButton aria-label="delete" sx={{display:{xs:"none",md:"block"}}} onClick={(e)=>
             { deleteemails(props.items)
              
              e.stopPropagation()}}>
                <Tooltip title="Delete">
                <DeleteIcon />
                </Tooltip>
                        </IconButton>
                        </Grid>
                        <Grid> <IconButton aria-label="delete" sx={{display:{xs:"none",md:"block"}}} onClick={(e)=>
             { readhandler(props.items)
              
              e.stopPropagation()}}>
                
               {props.items.isseen ? <Tooltip title="Mark as read"><MailOutlineIcon /> </Tooltip>:<Tooltip title="Mark as unread"><MarkunreadIcon/></Tooltip>}
               
                        </IconButton>
                        
                        </Grid>
                        
              </Grid>
    </div>
  )
}

export default Icons
