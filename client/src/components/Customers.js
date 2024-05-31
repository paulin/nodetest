import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get(`/api/customers`);
        setItems(response.data);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/customers`, form);
        fetchItems();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/customers/${id}`);
        fetchItems();
    };

    return (
        <div>
            <h1>Customers</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" onChange={handleChange} placeholder="Name" />
                <button type="submit">Add</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Customers;