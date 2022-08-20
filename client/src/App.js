import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import ProfileUpdate from './components/profile-update/profileUpdate';
import AddCategory from './components/add-category/addCategory';
import UpdateCategory from './components/update-category/updateCategory';

function App() {
  const [user, setLoginUser] = useState({})
  const [loginId,setLoginid] = useState(null)
  const [update,setUpdate] = useState(false)
  React.useEffect(()=>{
    setLoginid(localStorage.getItem("loginId"))
    // console.log(loginId)
    axios.post("http://localhost:9002/user", { id: loginId })
            .then(res => {
                setLoginUser(res.data)
                setUpdate(false)
                // console.log(res.data)
            })
  }, [loginId, update])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={ loginId ? <Home user = {user} setLoginUser = {setLoginUser} setLoginid= {setLoginid} /> : <Login setLoginUser = {setLoginUser} setLoginid= {setLoginid} /> } />
          <Route path='/login' element={<Login setLoginUser = {setLoginUser} setLoginid= {setLoginid} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profileUpdate' element={<ProfileUpdate user = {user} setUpdate={setUpdate}/>} />
          <Route path='/addCategory' element={<AddCategory />} />
          <Route path='/updateCategory/:category/:id' element={<UpdateCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
