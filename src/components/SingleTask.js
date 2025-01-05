import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTask, selectSingleTask } from '../store/taskSlice';


function SingleTask() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const task = useSelector(selectSingleTask);

    useEffect(() => {
        if (id) {
            dispatch(getSingleTask(id));
        }
    }, [dispatch, id]);

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="p-6 bg-white shadow-md rounded-lg space-y-4 mt-10">
                <h2 className="text-2xl font-bold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-gray-600">Priority: {task.priority}</p>
                <p className="text-gray-600">Due Date: {task.dueDate}</p>
            </div>

        </div>
    )
}

export default SingleTask
