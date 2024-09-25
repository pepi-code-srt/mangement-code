import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PartyList from './PartyList';
import './App.css';

function PartyListPage() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const savedParties = JSON.parse(localStorage.getItem('parties')) || [];
    setParties(savedParties);
  }, []);

  useEffect(() => {
    localStorage.setItem('parties', JSON.stringify(parties));
  }, [parties]);

  const handleAddParty = (name) => {
    if (name.trim()) {
      const newParty = {
        _id: Date.now(),
        name: name.trim(),
        balance: 0,
        transactions: []
      };
      setParties([...parties, newParty]);
    }
  };

  const handleDeleteParty = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setParties(parties.filter(party => party._id !== id));
    }
  };

  const handleUpdateParty = (id, newName) => {
    if (newName.trim()) {
      setParties(parties.map(party =>
        party._id === id ? { ...party, name: newName.trim() } : party
      ));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center"></h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter new customer name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddParty(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <PartyList
            parties={parties}
            onDeleteParty={handleDeleteParty}
            onUpdateParty={handleUpdateParty}
          />
        </div>
      </div>
    </div>
  );
}

export default PartyListPage;
