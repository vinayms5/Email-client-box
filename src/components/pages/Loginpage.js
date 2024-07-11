import React, { useState } from 'react'
import { FormControl,InputLabel,Input,FormHelperText,Box,TextField, Stack, Button} from '@mui/material';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import Navbar from '../headersection/Navbar';
import { useDispatch } from 'react-redux';
import { authsliceaction } from '../../Redux/auth';
const Loginpage = () => {
const [userdata,setuserdata]=useState({})
const [message,setmessage]=useState('')
const dispatch=useDispatch()
const navigate=useNavigate()
const submithandler=(e)=>{
  e.preventDefault()

console.log("kjbj kbc")
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDx9htjIVSjtCFKw1XrIq4VfKOawfScv4k'
  ,{
   method:'POST',
   body:JSON.stringify({
     email:userdata.username,
     password:userdata.password,
     returnSecureToken:true
   }),
   headers:{
     "Content-Type": "application/json"
   }
  }).then(res=>{
   if(res.ok){
    
    return res.json()
   }else{
     return res.json().then((data)=>{
       let err=data.error.message
       throw new Error(err)
     })
   }
  }).then((data)=>{
    console.log(data,"khbchjb")
      navigate("/inbox")
      dispatch(authsliceaction.loginhandler())
      localStorage.setItem("id",data.idToken)
      localStorage.setItem("name",data.localId)
     localStorage.setItem("gmail",userdata.username)
     localStorage.setItem("profiledata",JSON.stringify({name:"---",gender:"---",date:"---",number:"---"}))
      localStorage.setItem("valid",'login')




      }).catch((err)=>{
        setmessage(err.message)
   console.log(err.message)
 })

}
  return (
    <div style={{minHeight:"100vh"}}>
      
 <Box
      component="form"
      onSubmit={submithandler}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        minHeight:"100vh",
        backgroundColor:"rgba(0,0,0,0.3)"
        
      
        
      }}
     
      autoComplete="off"
    >
    
        <Stack gap={2} width={100}sx={
            {
                
                width:"25%",
                padding:"2rem",
                boxShadow:"0px 2px 8px rgba(0,0,0,0.1)",
                borderRadius:"12px",
                backgroundColor:"white"
                
            }
        }>  
          
       <section style={{textAlign:"center"}}><AccountCircleRoundedIcon color='primary' fontSize='large' /></section> 
       {!!message && <p style={{color:"red"}}>{message}</p>}
        <TextField id="outlined-basic" label="Username" type='emial' variant="outlined" required
        onChange={(e)=>{
setuserdata({...userdata,username:e.target.value})
        }}
        />
        <TextField id="outlined-basic1" label="Password" type='password' variant="outlined" required
        onChange={(e)=>{
          setuserdata({...userdata,password:e.target.value})
        }}
        />
        
     
        <NavLink  style={{
          textDecoration:"none",
          marginTop:"-0.5rem",
          marginLeft:"0.4rem"
        }}
        >Forgot Password ?</NavLink>
       
        <Button variant='contained' type='submit'>Log in</Button>
        <Box component='div' textAlign='center'>If you not creat a account yet ?  <NavLink
        to='/signup'
        sx={{
          textDecoration:"none",
          marginTop:"-0.5rem",
          marginLeft:"0.4rem"
        }}>Click here to Signup </NavLink></Box>
        

        </Stack>
     
    </Box>    </div>
  )
}

export default Loginpage
