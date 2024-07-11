import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../headersection/Navbar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box,Button,Container,Grid, ListItem } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import { Margin } from '@mui/icons-material'
import ArchiveIcon from '@mui/icons-material/Archive';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Icons from './Icons';
import { maildatasliceaction } from '../../Redux/maildata';


const Archivemale = () => {
  const navigate=useNavigate()
  const archivedata=useSelector(state=>state.mail.archivedata) 
  console.log(archivedata,"asklm")
  const [sentadat,setsentdata]=useState(archivedata)
  console.log(archivedata,sentadat,"asklm")
  const searchdata=useSelector(state=>state.search.searchdata)
 
  useEffect(()=>{
    console.log(archivedata,"lkslskncam c")
setsentdata([...archivedata])
  },[archivedata])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  
  };


 
  const dispatch=useDispatch()
  useEffect(()=>{
    const gmail=localStorage.getItem("gmail")
const congmail=gmail.replace(/@|\.com/g, '')
    axios.get(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/archive${congmail}.json`)
       .then(res=>{
       
        let kb=[]
        for(let key in res.data){
            kb.push({...res.data[key],key:key})
        }
        setfilterdata([...kb])
    dispatch(maildatasliceaction.allarchive([...kb]))
    
        }).catch(err=>console.log(err.message))
  },[])
  const isdelte=useSelector(state=>state.mail.isdelete)
  const [filterddat,setfilterdata]=useState([])
  
 useEffect(()=>{
  
     let filterdata=archivedata.filter((item)=>{
      let kb=item.email+item.subject+item.msg
      return kb.includes(searchdata)
     })
     console.log(filterdata)
     if(searchdata){
      console.log("jhsv")
      setsentdata(filterdata)
     }
 },[searchdata])

const artchievedata=()=>{

}
const [state, setState] = React.useState({
  open: false,
  vertical: 'bottom',
  horizontal: 'right',
});
const { vertical, horizontal, open } = state;

const deleteemails=(item)=>{
        
    const gmail=localStorage.getItem("gmail")
    const congmail=gmail.replace(/@|\.com/g, '')
    
    
    axios.delete(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/archive${congmail}/${item.key}.json`)
    .then(res=>{
       
    const data=archivedata.filter((ele)=>ele.key!==item.key)
   
    dispatch(maildatasliceaction.archideletedata([...data]))
    dispatch(maildatasliceaction.isdeletehandler())
    setTimeout(()=>{
        dispatch(maildatasliceaction.isdeletehandler())
    },2000)
   
   
      }).catch(err=>console.log(err.message))
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <Navbar></Navbar>
      <Box component="main" sx={{ flexGrow: 1, }}>
       
      <Box component='div' sx={{
       
        width:"100%",
       margin:"auto",
      
      
      }}>
        <div style={{marginTop:"4.1rem"}}>
        <h1 style={{textAlign:"center",backgroundColor:"rgba(0,0,0,0.0)"}}>Archive mails</h1>
      {
       sentadat.map((item)=>{
            return  <Grid onClick={()=>{
              console.log("kb")
              navigate(`/inbox/${item}`,{state:{...item}})
            }} key={item.subject} container 
            boxShadow='0px 2px 6px rgba(0,0,0,0.1)' 
            padding='0.2rem 01rem 0.2rem 01rem' 
            sx={{
              flexDirection:{xs:"column", md:"row" },
              '&:hover':{
                boxShadow:'0px 2px 8px rgba(0,0,0,0.8)' 
                  }
            }}   
           >
             
            <Grid  item xs={3}  fontWeight="bold" >
              
             <ListItem > <StarBorderIcon fontSize='25px'sx={{
              marginRight:"0.6rem"
             }} />{item.email}</ListItem> 
            </Grid>
            <Grid item container  xs={12} md={9} justifyContent='space-between'>
            <Grid  sx={{
              paddingLeft:{xs:"3rem",xl:"0rem"},
                paddingTop:{xs:'0px',md:"10px"},
                cursor:"pointer"
            }}> <span style={{fontWeight:"bold"}}>{item.subject}</span> -{item.msg.slice(1,100)}<span>{item.msg.length>100 && "..."}</span>
            </Grid>
           <Grid>
           <Grid> <IconButton aria-label="delete" sx={{display:{xs:"none",md:"block"}}} onClick={(e)=>
             { deleteemails(item)
              
              e.stopPropagation()}}>
                <Tooltip title="Delete">
                <DeleteIcon />
                </Tooltip>
                        </IconButton>
                        </Grid>
           </Grid>
              
            </Grid>
           
          </Grid>
         

         
        })
      }
   
     <Snackbar
     anchorOrigin={{ vertical, horizontal }}
   
     open={isdelte} 
     autoHideDuration={6000} 
     onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         message is deleted succefully
        </Alert>
      </Snackbar>

     

      </div>
      
      </Box>
      </Box>
      </Box>
    </div>
  )
}

export default Archivemale