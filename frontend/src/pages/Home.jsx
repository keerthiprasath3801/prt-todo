import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:5000/home";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err.message || 'Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">SKPRT</div>
                <div className="user-actions">
                    <span className="username">Hi, {loggedInUser}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <main className="product-list">
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index} className="product-card">
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </main>
            
            <ToastContainer />
        </div>
    );
};

export default Home;
