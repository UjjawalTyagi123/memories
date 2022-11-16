import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/postdetails/PostDetails';

const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'))
  return(
  <Router>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route exact path="/posts" element={<Home/>}/>
        <Route exact path="/posts/search" element={<Home/>}/> 
        <Route exact path="/posts/:id" element={<PostDetails/>}/>
        <Route exact path="/auth" element={!user?<Auth/>  : <Navigate replace to="/posts" />}/>

      </Routes>
   
    </Container>
   </Router>
)};

export default App;