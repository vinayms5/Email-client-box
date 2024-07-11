import React, { useEffect, useState } from 'react'
import Navbar from '../headersection/Navbar'
import { Box,Button,Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import { Margin } from '@mui/icons-material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Icons from './Icons';
const data=[{gmail:"darshankb46@gmail.com",subject:"resunme",msg:";kmsdlknmcsdkjcnckjbsdcjb"},{gmail:"lkcnsdlkcn",subject:"resunme",msg:";kmsdlknmcsdkjcnckjbsdcjb"}]
const Sentmail = () => {
  const navigate=useNavigate()
  const [sentadat,setsentdata]=useState([])
  useEffect(()=>{
    const gmail=localStorage.getItem("gmail")
const congmail=gmail.replace(/@|\.com/g, '')
    axios.get(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/sent${congmail}.json`)
       .then(res=>{
      
        let kb=[]
        for(let key in res.data){
kb.push({...res.data[key],key:key})
        }
        setsentdata([...kb])
        }).catch(err=>console.log(err.message))
  },[])

  const deleteemails=(item)=>{
    const gmail=localStorage.getItem("gmail")
    const congmail=gmail.replace(/@|\.com/g, '')
    console.log("cjndckjnb")
    axios.delete(`https://gurugaandu-8c45a-default-rtdb.firebaseio.com/sent${congmail}/${item.key}.json`)
    .then(res=>{
       console.log(res,"jcnsdkjcnbc")
    const data=sentadat.filter((ele)=>ele.key!==item.key)
    setsentdata([...data])
      }).catch(err=>console.log(err.message))
  }
  return (
    <div>
       <Box sx={{ display: 'flex' }}>
      <Navbar></Navbar>
      <Box component="div" sx={{ flexGrow: 1, }}>
      <Box component='div' sx={{
        
        width:"100%",
       margin:"auto",
       backgroundColor:"rgba(0,0,0,0.1)"
      }}>
        <div style={{marginTop:"4.1rem"}}>
        <h1 style={{textAlign:"center",backgroundColor:"rgba(0,0,0,0)"}}>Sent mail</h1>
      {
        sentadat.map((item)=>{
            return <Grid key={item.subject} container 
            boxShadow='0px 2px 4px rgba(0,0,0,0.1)'
            padding='0.2rem 01rem 0.2rem 01rem' 
            onClick={()=>{
              console.log("kb")
              navigate(`/sentmail/${item}`,{state:{...item}})
            }} 
            sx={{
              flexDirection:{xs:"column", md:"row" },
              '&:hover':{
                boxShadow:'0px 2px 8px rgba(0,0,0,0.8)' 
                  }
            }}    >
            <Grid item xs={3}  paddingTop='7px' fontWeight="bold" >
            <StarBorderIcon fontSize='25px'sx={{
              marginRight:"0.6rem"
             }} />
              {item.email}
            </Grid>
            <Grid container item xs={12} md={9} justifyContent='space-between'>
              <Grid paddingTop='7px'> <span style={{fontWeight:"bold"}}>{item.subject}</span> -{item.msg.slice(1,100)}<span>{item.msg.length>100 && "..."}</span></Grid>
              
      
            </Grid>
           
          </Grid>
          
        })
      }
      </div>

      </Box>
      </Box>
      </Box>
    </div>
  )
}

export default Sentmail
