import React from 'react';
import Auth from './components/auth'
import Search from './components/search'
import List from './components/list'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header';

function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/list" element={<List/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
