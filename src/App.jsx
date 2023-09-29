
import './App.css';

import React from 'react';


import Header from './components/Header';
import Accueil from './pages/Accueil';

import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

import DatasetTable from './pages/dataset';

import PatientSearchInterface from './pages/detailPatient';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Accueil />}></Route>
       
        <Route path='/detaitPatient' element={<PatientSearchInterface />}></Route>
        <Route path='/dataset' element={<DatasetTable/>}></Route>
       
        






      </Routes>
      <Footer />
    </div>
  );
}

export default App;
