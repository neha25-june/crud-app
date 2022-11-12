import logo from './logo.svg';
import './App.css';
import Articles from './components/Articles';
import AddArticles from './components/AddArticles';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Article from './components/Article';
import { useState } from 'react';
import Search from './components/Search';


function App() {
  return (
    <>
    <div className="container">
      <Router>
        <Routes>
          <Route path='/register' element={
            <Register />
          } />
          <Route path='/signin' element={<Login />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/' element={
            <div className='row mt-5'>
              <div className='col-md-8'>
                <Articles />
              </div>
              <div className='col-md-4'>
                <AddArticles />
              </div>
            </div>
          } />
          <Route path='/search' element={<Search/>} />
        </Routes>
        <Navbar />
      </Router>
    </div>
    </>
  );
}

export default App;