import React from 'react';
import { Link } from 'react-router-dom';

function PartyList({ parties, onDeleteParty, onUpdateParty }) {
  return (
    <ul className="list-group">
      {parties.map(party => (
        <li key={party._id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{party.name}</span>
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => onUpdateParty(party._id, prompt("Enter new name:", party.name))}
            >
              Update
            </button>
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => onDeleteParty(party._id)}
            >
              Delete
            </button>
            <Link to={`/transactions/${party._id}`} className="btn btn-primary btn-sm">Select</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PartyList;
