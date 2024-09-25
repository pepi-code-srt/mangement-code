import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import PartyListPage from './PartyListPage';
import TransactionPage from './TransactionPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<PartyListPage />} />
      <Route path="/transactions/:partyId" element={<TransactionPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
