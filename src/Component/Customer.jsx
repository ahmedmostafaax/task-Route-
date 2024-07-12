import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Transactions from './Transactions.jsx';

export default function Customer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3005/customers')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
    };

    return (
        <div className='container my-3'>
            {selectedCustomer ? (
                <Transactions customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
            ) : (
                <>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control m-3" 
                            placeholder="Search by name" 
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <table className="table table-hover no-underline">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((d, i) => (
                                <tr key={i} onClick={() => handleCustomerClick(d)}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
