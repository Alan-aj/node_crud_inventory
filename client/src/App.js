import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import ProfileUpdate from './components/profile-update/profileUpdate';

function App() {
  const [user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={ user && user._id ? <Home user = {user} setLoginUser = {setLoginUser} /> : <Login setLoginUser = {setLoginUser} />} />
          <Route exact path='/login' element={<Login setLoginUser = {setLoginUser} />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profileUpdate' element={<ProfileUpdate user = {user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
