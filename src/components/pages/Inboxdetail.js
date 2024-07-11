import React from 'react'
import Navbar from '../headersection/Navbar';
import { useParams,useLocation } from 'react-router-dom'
import { Avatar, Box, Container, Stack, Typography,Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Fab from '@mui/material/Fab';
const Inboxdetail = () => {
    const {id}=useParams()
    const location=useLocation()
   
    const k=location.state.email.slice(0,1)
  return (
    <div style={{
      backgroundColor:"rgba(0,0,0,0.1)",
      minHeight:"100vh"
    }}>
        <Box sx={{ display: 'flex' }}>
      <Navbar></Navbar>
      <Box component="main" sx={{ flexGrow: 1, }}>
      <Box component='div' sx={{
       
       width:"100%",
      margin:"auto",
      marginTop:"5rem",
     }}>
      
      <Box component='div' sx={{
padding:'1rem 5rem'
      }}><h1>{location.state.subject}</h1></Box>
      <Box padding='0rem 2rem' sx={{
        display:"flex",
        gap:"0.5rem"
      }}>
        <Avatar src='dara' style={{backgroundColor:"green"}}>{k.toUpperCase()}</Avatar>
        <Box component='div'>
        <div  style={{
          fontWeight:"bold",
          fontSize:"17px"
        }}>{location.state.email}</div>
        <div style={{display:"flex"}}> <div style={{marginTop:""}}>to me</div> <ArrowDropDownIcon/></div>
        </Box>
        
      </Box>
      <Box component='div' sx={{
padding:'1rem 5rem'
      }}>
      <Box padding='1rem'  sx={{
          boxShadow:"0px 2px 6px rgba(0,0,0,0,0.3)",
          backgroundColor:"white",
          borderRadius:"12px",
          width:"100%",
          height:"60vh"
        }}><Box>{location.state.msg}</Box>
           <Box sx={{ '& > :not(style)': { m: 1 },
        marginTop:"2rem" }}>
      <Button variant="outlined" size="small" sx={{
        color:"black",
        border:"0.7px solid black"
      }} >
        Reaply 
      </Button>
      <Button variant="outlined" size="small" sx={{
        color:"black",
        border:"0.7px solid black"
      }} >
        
        Forword
      </Button>
      
      
      
    </Box>
        
        </Box>
     
      </Box>
      
      </Box>
         

      </Box>
      </Box>
    </div>
  )
}

export default Inboxdetail
