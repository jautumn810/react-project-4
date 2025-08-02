import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Post from './components/Posts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/users" element={<Home />} />
          <Route path="/posts" element={<Post listMode={true} />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/user/:id" element={<Post />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 