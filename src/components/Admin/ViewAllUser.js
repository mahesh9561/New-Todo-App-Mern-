import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser, selectAllUsers } from '../../store/adminSlice';

function ViewAllUser() {
    const allUser = useSelector(selectAllUsers); // Fetch all users from the Redux store
    const loading = useSelector((state) => state.admin.AdminStatus) === 'loading'; // Correctly check AdminStatus
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser()); // Dispatch the thunk to fetch users
    }, [dispatch]);

    const handleDelete = (id) => {
        console.log("Delete user ID:", id);
        dispatch(deleteUser(id));
    };
    
    if (loading) return <div>Loading...</div>;
console.log(allUser)
    return (
        <div className='p-5'>
            <h1 className="text-2xl font-bold mb-4">View All Users</h1>
            <div className="flex flex-wrap gap-5">
                {allUser?.map((user) => (
                    <div key={user._id} className="flex-1 sm:flex-initial lg:flex-1/3 box-border">
                        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                            <p className="font-medium text-lg"><strong>Name:</strong> {user.name}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>Mobile:</strong> {user.mobile}</p>
                            <p className="text-gray-700"><strong>Role:</strong> {user.role}</p>
                            <button className='px-4 py-2 border rounded-md my-1' onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllUser;
