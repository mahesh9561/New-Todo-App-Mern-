import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    };

    const moveToDashboard = () => {
        navigate('/user'); // Assuming this is the user dashboard route
    };

    const moveToTasks = () => {
        navigate('/tasks');
    };

    const addTask = () => {
        navigate('/user');
    };

    const viewAllTasks = () => {
        navigate('/view-all-tasks');
    };

    return (
        <div
            className={
                location.pathname === '/login' || location.pathname === '/'
                    ? 'bg-gradient-to-t to-blue-700 from-blue-400 p-5 h-[33vh]'
                    : 'bg-gray-100 p-5 text-gray-700'
            }
        >
            <div className="flex justify-between items-center font-medium text-white">
                <div className="flex items-center">
                    {location.pathname === '/login' ? (
                        'Please Login'
                    ) : location.pathname === '/' ? (
                        'Please Register'
                    ) : (
                        <span className="text-slate-950">
                            {location.pathname === '/admin' ? 'Admin Panel' : 'Welcome Mahesh'}
                        </span>
                    )}
                </div>

                {location.pathname !== '/login' && location.pathname !== '/' && (
                    <div className="flex items-center space-x-4">
                        {location.pathname === '/profile' && location.pathname !== '/admin' && (
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={moveToDashboard}
                            >
                                Dashboard
                            </button>
                        )}
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-5">
                {location.pathname === '/user' && (
                    <div className="flex space-x-4 justify-evenly">
                        <button
                            onClick={moveToTasks}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Move to Tasks
                        </button>
                        <button
                            onClick={addTask}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Add Tasks
                        </button>
                    </div>
                )}

                {location.pathname === '/admin' && (
                    <div className="flex space-x-4">
                        <button
                            onClick={viewAllTasks}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            View All Tasks
                        </button>
                    </div>
                )}
            </div>

            {(location.pathname === '/login' || location.pathname === '/') && (
                <div className="flex justify-between text-3xl font-medium text-white items-center mt-5">
                    <Link to="/login">Login</Link>
                    <Link to="/">Register</Link>
                </div>
            )}
        </div>
    );
}

export default Header;
