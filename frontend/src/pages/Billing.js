import React, { useState, useEffect } from 'react';
import api from '../api';

function Billing() {
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [billingDate, setBillingDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const handleAddBilling = async (e) => {
    e.preventDefault();
    try {
      await api.post('/billing', { customerName, totalAmount, billingDate });
      fetchBills(); // Refresh the bill list
      setCustomerName('');
      setTotalAmount(0);
    } catch (error) {
      console.error('Error adding billing:', error);
    }
  };

  const fetchBills = async () => {
    try {
      const response = await api.get('/billing');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  return (
    <div>
      <h1>Billing</h1>

      <form onSubmit={handleAddBilling}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
          required
        />
        <input
          type="date"
          value={billingDate}
          onChange={(e) => setBillingDate(e.target.value)}
          required
        />
        <button type="submit">Generate Bill</button>
      </form>

      <h2>Bill List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Billing Date</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.customerName}</td>
              <td>{bill.totalAmount}</td>
              <td>{new Date(bill.billingDate).toLocaleDateString()}</td>
              <td>
                {bill.qrCode && (
                  <img
                    src={`data:image/png;base64,${bill.qrCode}`}
                    alt={`QR Code for ${bill.customerName}`}
                    width="100"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Billing;