import logo from './logo.svg';
import './App.css';
import Navbar from './components/headersection/Navbar';
import Loginpage from './components/pages/Loginpage';
import Navbar2 from './components/headersection/Navbar2';
import { Navigate } from 'react-router-dom';

import { Routes,Route } from 'react-router-dom';
import Signup from './components/pages/Signup';
import { Inbox } from '@mui/icons-material';
import Inbox12 from './components/pages/Inbox12'
import Compose from './components/pages/Compose';
import Sentmail from './components/pages/Sentmail';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authsliceaction } from './Redux/auth';
import Inboxdetail from './components/pages/Inboxdetail';
import Sentboxdetail from './components/pages/Sentboxdetail';
import Archivemale from './components/pages/Archivemail';
function App() {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth.islogin)
  
  let kb=localStorage.getItem("id")
 useEffect(()=>{
if(kb){
  dispatch(authsliceaction.loginhandler())
}
else{
  dispatch(authsliceaction.logouthandler())
}
 },[])
console.log(auth)
  return (
    <Routes>
      <Route path='/' element= {auth ? <Navigate to='/inbox'/>:<Loginpage></Loginpage>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/compose' element={<Compose></Compose>}></Route>
      <Route path='/inbox' element={!auth ? <Navigate to='/'/>:<Inbox12></Inbox12>}></Route>
      <Route path='/sentmail' element={<Sentmail></Sentmail>}></Route>
      <Route path='*' element={auth ? <Navigate to='/inbox'/>:<Loginpage></Loginpage>}></Route>
      <Route path='/inbox/:id' element={<Inboxdetail></Inboxdetail>}></Route>
      <Route path='/sentmail/:id' element={<Sentboxdetail></Sentboxdetail>}></Route>
      <Route path='/archive' element={<Archivemale></Archivemale>}></Route>
    </Routes>
  );
}

export default App;
