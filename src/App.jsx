import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import './styles.css';
import Post from './component/Post';
import PostDetail from './component/PostDetail';

const propMessage = 'Hello from';

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route index path="/posts" element={<Post propMessage={propMessage} />} />
            <Route path="/posts/:id" element={<PostDetail propMessage={propMessage} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
 
export default App;  