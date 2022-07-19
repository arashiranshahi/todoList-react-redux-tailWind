import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Layout from './components/Layout/Layout';
import TodoList from './components/customs/TodoList/TodoList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><TodoList/></Layout>} />
      </Routes>
    </>
  );
}

export default App;
