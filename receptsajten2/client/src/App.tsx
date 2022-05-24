import React from 'react';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import MainHeader from './components/header'
import Navbar from './components/nav';
import SingleRecipe from './components/recept';
import RecipesByCategoryList from './components/kategori';
import RecipeList from './components/receptlista';
import RecipeCard from './components/receptkort';
import Receptlista from './components/receptlista';

const App = () => {
  return(
    <div className='App'>
  <header>
    <MainHeader/>

    <Routes>
    <Route path="/" element={<RecipeList/>}/>
    <Route path="recept/:receptId" element={<SingleRecipe/>}/>
    </Routes>

  </header>


  

  
  </div>
  )
}

export default App;
