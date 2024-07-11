import React, { useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from '@mui/material';
import { Padding } from '@mui/icons-material';
import axios from 'axios';
import Navbar2 from '../headersection/Navbar2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../headersection/Navbar';


const Compose = () => {
const[sentdata,setsentdata]=useState({})

const navigate=useNavigate()
const submithandler=(e)=>{
e.preventDefault()
console.log("dcjbnckjb")
const gmail=localStorage.getItem("gmail")
const cleanedEmail = sentdata.email.replace(/@|\.com/g, '');
axios.post(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/get${cleanedEmail}.json`,{...sentdata,email:gmail,isseen:false})
.then(res=>res).catch(err=>console.log(err.message))


const congmail=gmail.replace(/@|\.com/g, '')
axios.post(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/sent${congmail}.json`,{...sentdata,isseen:false})
.then(res=> navigate('/inbox')).catch(err=>console.log(err.message))

}

  return (
    <React.Fragment>
        <Box sx={{ display: 'flex' }}>
          <Navbar></Navbar>
          <Box component="main" sx={{ flexGrow: 1,  }}>
    <div style={{width:"50%",margin:"auto"}}>
        <h3 style={{textAlign:"center"}}>New Messages</h3>
       <Box sx={{ '& > :not(style)': { m: 1 },
       backgroundColor:"white",
       marginTop:"2rem",
    borderRadius:"12px",
    boxShadow:"0px 2px 8px rgba(0,0,0,0.6)",
    padding:"2rem"
    
    
    }} component="form" onSubmit={submithandler}>
    
      <FormControl variant="standard" sx={{width:"100%"}}>
       
        <Input
          id="input-with-icon-adornment"
          required
          onChange={(e)=>{
            setsentdata({...sentdata,email:e.target.value})
          }}
         type='email'
          startAdornment={
            <InputAdornment position="start">
              To
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
           Cc   Bcc
          </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard" sx={{width:"100%"}}>
       
        <Input
          id="input-with-icon-adornment"
          placeholder='Subject'
          required
          onChange={(e)=>{
            setsentdata({...sentdata,subject:e.target.value})
          }}
          
        />
      </FormControl>
      <textarea
      required
      onChange={(e)=>{
        setsentdata({...sentdata,msg:e.target.value})
      }}
      className='textarea' placeholder='Write Your messages here' style={{width:"100%",border:"none",height:"40vh",overflow:"hidden",overflowY:"scroll",fontFamily:"Segoe UI"}}></textarea>
      <Button variant='contained' type='submit'>Send</Button>
    </Box>
   
    </div>
    </Box>
    </Box>
    </React.Fragment>
  )
}

export default Compose
