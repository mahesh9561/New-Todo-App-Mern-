import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask, getSingleTask } from '../store/taskSlice';

function UpdateTask() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigator = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const { singleTask } = useSelector((state) => state.task);

    useEffect(() => {
        if (id) {
            dispatch(getSingleTask(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (singleTask) {
            setTitle(singleTask.title || '');
            setDescription(singleTask.description || '');
            setPriority(singleTask.priority || 'Medium');
            const formattedDueDate = new Date(singleTask.dueDate).toISOString().slice(0, 10);
            setDueDate(formattedDueDate);
        }
    }, [singleTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            title,
            description,
            priority,
            dueDate,
        };

        dispatch(editTask({ id, updatedTaskData: updatedTask }));

        alert(`Task "${title}" updated successfully`);
        navigator('/tasks');
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 mt-10"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Please enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        placeholder="Please enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTask;
