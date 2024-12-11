// src/App.jsx  
import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import FormContainer from './components/FormContainer';  
import Home from './Home';  
import DisplayAlbum from './components/DisplayAlbum';

const App = () => {  
  return (  
        <Routes>  
          <Route path="/" element={<FormContainer />} /> {/* Routes must be defined accurately */}  
          <Route path="/dashboard/*" element={<Home />} />  
          {/* Include additional routes as needed */}  
          <Route path="/login" element={<FormContainer />} /> {/* Add if needed */} 
          <Route path="/album/:id" element={<DisplayAlbum />} /> 
        </Routes>   
  );  
};  

export default App;