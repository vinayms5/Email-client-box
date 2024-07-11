import React,{useState} from 'react'
import { FormControl,InputLabel,Input,FormHelperText,Box,TextField, Stack, Button } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Navbar from '../headersection/Navbar';
import { NavLink,useNavigate } from 'react-router-dom';
const Signup = () => {

    const [userdata,setuserdata]=useState({})
    const navigate=useNavigate()
    const submithandler=(e)=>{
        e.preventDefault()
    console.log("lkcndcjn")
    
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDx9htjIVSjtCFKw1XrIq4VfKOawfScv4k'
      ,{
       method:'POST',
       body:JSON.stringify({
         email:userdata.username,
         password:userdata.password1,
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
        console.log(data,"jhvbcjhd")
          navigate("/")
          
          localStorage.setItem("id",data.idToken)
          localStorage.setItem("name",data.localId)
         localStorage.setItem("gmail",userdata.username)
         localStorage.setItem("profiledata",JSON.stringify({name:"---",gender:"---",date:"---",number:"---"}))
          localStorage.setItem("valid",'login')
    
    
    
    
          }).catch((err)=>{
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
                
                width:"30%",
                padding:"2rem",
                boxShadow:"0px 2px 8px rgba(0,0,0,0.1)",
                borderRadius:"12px",
                backgroundColor:"white"
                
            }
        }>  
       <section style={{textAlign:"center"}}><AccountCircleRoundedIcon color='primary' fontSize='large' /></section> 
        <TextField id="outlined-basic" label="Username" type='emial' variant="outlined" required
        onChange={(e)=>{
            setuserdata({...userdata,username:e.target.value})
                    }}
                    />
        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" required
        onChange={(e)=>{
            setuserdata({...userdata,password:e.target.value})
                    }}
                    />
        <TextField id="outlined-basic" label="Confim password" type='password' variant="outlined" required
        onChange={(e)=>{
            setuserdata({...userdata,password1:e.target.value})
                    }}
                    />
        <Button variant='contained' type='submit'>Signup</Button>
        <Box component='div' textAlign='center'>Already have account ?  <NavLink
        to='/'
        sx={{
          textDecoration:"none",
          marginTop:"-0.5rem",
          marginLeft:"0.4rem"
        }}>Log in here </NavLink></Box>
        </Stack>
     
    </Box>    </div>
  )
}

export default Signup
