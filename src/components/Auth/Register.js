import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://new-todo-app-backend-2jg4.onrender.com/api/auth/register', {
                name,
                email,
                mobile,
                pass,
            }, {
                withCredentials: true
            })
            alert('Register Successfull', response.name);
            navigate('/login');
        } catch (e) {
            console.log(e, "Error")
        }
        setName('');
        setEmail('');
        setPass('');
        setMobile('');
    }
    return (
        <div className=' flex justify-center text-sla bg-white text-slate-700 mb-10 '>
            <div className=' p-5 border w-1/2 items-center shadow-md rounded-lg -mt-10 bg-white'>
                <div className=' text-center text-2xl font-semibold uppercase py-3'>Register Form</div>
                <form onSubmit={handleSubmit} className=' font-semibold '>
                    <div className=' py-2'>
                        <label className='text-sm md:text-base'>Username:</label>
                        <input type="text" className=' w-full px-3 py-2 border outline-none rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className=' py-2'>
                        <label className='text-sm md:text-base'>Email:</label>
                        <input type="text" className=' w-full px-3 py-2 border outline-none rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className=' py-2'>
                        <label className='text-sm md:text-base'>Mobile:</label>
                        <input type="text" className=' w-full px-3 py-2 border outline-none rounded-md' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div className=' py-2'>
                        <label className='text-sm md:text-base'>Password:</label>
                        <input type="password" className=' w-full px-3 py-2 border outline-none rounded-md' value={pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className=' py-2'>
                        <button className=' px-4 py-2 bg-blue-400 rounded-lg text-white'>Register</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register