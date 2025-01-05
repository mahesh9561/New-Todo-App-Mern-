import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDecodeJWT from '../../Hooks/useJwtToken';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { decodedToken, decodeToken, error, setError } = useDecodeJWT();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8005/api/auth/login', { email, pass }, { withCredentials: true });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                decodeToken(response.data.token);

                if (decodedToken?.role === 'admin') {
                    navigate('/admin');
                } else if (decodedToken?.role === 'user') {
                    navigate('/user');
                } else {
                    setError("Invalid role detected.");
                }
            } else {
                setError("Invalid login credentials.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div>
            <div className="flex justify-center bg-white text-slate-700 mb-10">
                <div className="p-5 border w-1/2 items-center shadow-md rounded-lg -mt-10 bg-white">
                    <div className="text-center text-2xl font-semibold uppercase py-3">Login Form</div>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="font-semibold">
                        <div className="py-2">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-3 py-2 border outline-none rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="py-2">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-3 py-2 border outline-none rounded-md"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="py-2">
                            <button type="submit" className="px-4 py-2 bg-blue-400 rounded-lg text-white">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
