import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { sendTask } from '../store/taskSlice';

function User() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState(""); // Fixed typo in variable name

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !dueDate) {
            setError("All fields are required.");
            return;
        }
        try {
            await dispatch(sendTask({ title, description, priority, dueDate })).unwrap();
            setError("");
            alert("Task published successfully!");
            // Clear input fields after successful submission
            setTitle("");
            setDescription("");
            setPriority("Low");
            setDueDate("");
        } catch (err) {
            const errorMessage = err?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
        }
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
                        Add Task
                    </button>
                </div>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default User;
