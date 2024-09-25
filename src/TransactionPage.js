import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './App.css';

function TransactionPage() {
  const { partyId } = useParams();
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const savedParties = JSON.parse(localStorage.getItem('parties')) || [];
    setParties(savedParties);
    const party = savedParties.find(p => p._id === parseInt(partyId, 10));
    setSelectedParty(party);
  }, [partyId]);

  useEffect(() => {
    if (selectedParty) {
      const updatedParties = parties.map(party =>
        party._id === selectedParty._id ? selectedParty : party
      );
      localStorage.setItem('parties', JSON.stringify(updatedParties));
      setParties(updatedParties);
    }
  }, [selectedParty]);

  const handleAddTransaction = (transaction) => {
    if (selectedParty) {
      const newTransaction = {
        date: transaction.date,
        amount: parseFloat(transaction.amount),
        type: transaction.type
      };
      const updatedParty = {
        ...selectedParty,
        transactions: [...selectedParty.transactions, newTransaction],
        balance: selectedParty.balance + (transaction.type === 'credit' ? newTransaction.amount : -newTransaction.amount)
      };
      setSelectedParty(updatedParty);
    }
  };

  const downloadXLS = () => {
    const header = [["Date", "Amount", "Type"]];
    const rows = selectedParty.transactions.map(t => [
      t.date, t.amount.toFixed(2), t.type
    ]);

    const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, `${selectedParty.name}_transactions.xlsx`);
  };

  return (
    <div className="container mt-4">
      {selectedParty ? (
        <>
          <h2>{selectedParty.name} - Transactions</h2>

          {/* Total Balance Display */}
          <h4>Total Balance: {selectedParty.balance.toFixed(2)}</h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTransaction({
                date: e.target.date.value,
                amount: e.target.amount.value,
                type: e.target.type.value
              });
              e.target.reset();
            }}
          >
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" name="date" required />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="number" className="form-control" name="amount" required />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select className="form-select" name="type" required>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Transaction</button>
          </form>

          <button className="btn btn-info mt-3" onClick={downloadXLS}>Download as XLS</button>

          <h3 className="mt-4">Transactions</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {selectedParty.transactions.slice(
                (currentPage - 1) * transactionsPerPage,
                currentPage * transactionsPerPage
              ).map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount.toFixed(2)}</td>
                  <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading Customer details...</p>
      )}
    </div>
  );
}

export default TransactionPage;
