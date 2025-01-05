import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTask, selectAllTasks } from '../store/taskSlice';
import { useNavigate } from 'react-router-dom';

function AllTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const loading = useSelector((state) => state.task.taskStatus) === 'loading';
  const error = useSelector((state) => state.task.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const openBlog = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (id) => {
    navigate(`/editTask/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {loading && (
        <p className="text-center text-blue-500">Loading tasks...</p>
      )}

      {error && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded shadow bg-white hover:shadow-lg"

          >
            <div onClick={() => openBlog(task._id)}>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-gray-600">Priority: {task.priority}</p>
              <p className="text-gray-600">Due Date: {task.dueDate}</p>
            </div>
            <div className="flex space-x-4 mt-3">
              <button
                onClick={() => handleEdit(task._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
