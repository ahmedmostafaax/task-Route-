import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Transactions({ customer, onBack }) {
    const [transactions, setTransactions] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
       
        axios.get(`http://localhost:3005/transactions?customerId=${customer.id}`)
            .then(res => setTransactions(res.data))
            .catch(err => console.log(err));

      
        axios.get(`http://localhost:3005/customers/${customer.id}`)
            .then(res => setCustomerDetails(res.data))
            .catch(err => console.log(err));
    }, [customer.id]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredTransactions = transactions.filter(t => t.amount.toString().includes(search));

    return (
        <div className='container my-3'>
          
            <h2>chart for {customerDetails.name}</h2>
            <button className="btn btn-success mb-3" onClick={onBack}>Back</button>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customerDetails.id}</td>
                        <td>{customerDetails.name}</td>
                        
                    </tr>
                </tbody>
            </table>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control m-1" 
                    placeholder="Search by amount" 
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filteredTransactions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
