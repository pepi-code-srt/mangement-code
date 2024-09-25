import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartyListPage from './PartyListPage';
import TransactionPage from './TransactionPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center">Customer and Transaction Manager</h1>
        <Routes>
          <Route path="/" element={<PartyListPage />} />
          <Route path="/transactions/:partyId" element={<TransactionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
