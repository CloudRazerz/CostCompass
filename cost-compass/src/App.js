import React from 'react';
import {Routes, Route} from 'react-router-dom';  // Import necessary router components
import Home from './components/home';
import ResourceInfo from './components/resource-info';


function App() {
  return (
        <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/resources" element={<ResourceInfo />} />
        </Routes>
        </div>
  );
}

export default App;