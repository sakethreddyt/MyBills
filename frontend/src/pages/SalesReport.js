import React, { useState } from 'react';
import api from '../api';

function SalesReport() {
  const [date, setDate] = useState('');
  const [sales, setSales] = useState(null);

  const handleFetchSales = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/reports/sales', { params: { date } });
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      alert('Failed to fetch sales data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <form onSubmit={handleFetchSales}>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Get Sales Report</button>
      </form>

      {sales !== null && (
        <div>
          <h2>Sales on {date}:</h2>
          <p>Total Sales: ₹{sales.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default SalesReport;