import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/Status';
import axios from 'axios';

const initialState = {
    tasks: [],
    singleTask: null,
    taskStatus: STATUS.IDLE,
    singleTaskStatus: STATUS.IDLE,
    error: null,
    singleTaskError: null,
};

// Add Task (POST)
export const sendTask = createAsyncThunk(
    'task/addTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://new-todo-app-backend-2jg4.onrender.com/api/task/addTask', taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add task");
        }
    }
);

export const getTask = createAsyncThunk(
    'task/getTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://new-todo-app-backend-2jg4.onrender.com/api/task/getblog', {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch tasks");
        }
    }
);

// Fetch Single Task (GET)
export const getSingleTask = createAsyncThunk(
    'task/getSingleTask',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://new-todo-app-backend-2jg4.onrender.com/api/task/getblogs/${id}`, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch task");
        }
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://new-todo-app-backend-2jg4.onrender.com/api/task/delete/${id}`, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete task");
        }
    }
);


// 
// export const getProfile = createAsyncThunk(
//     'task/getUserProfile',
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`https://new-todo-app-backend-2jg4.onrender.com/api/auth/profile`, {
//                 withCredentials: true,
//             });
//             return response.data.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch task");
//         }
//     }
// );
export const getProfile = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://new-todo-app-backend-2jg4.onrender.com/api/auth/profile', {
                withCredentials: true, // Ensure withCredentials is set for authorization
            });
            return response.data; // Return user profile data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user profile");
        }
    }
);


export const editTask = createAsyncThunk(
    'task/editTask',
    async ({ id, updatedTaskData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://new-todo-app-backend-2jg4.onrender.com/api/task/update/${id}`, updatedTaskData, {
                withCredentials: true,
            });
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to edit task");
        }
    }
);


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Task
            .addCase(sendTask.pending, (state) => {
                state.taskStatus = STATUS.LOADING;
                state.error = null;
            })
            .addCase(sendTask.fulfilled, (state, action) => {
                state.taskStatus = STATUS.SUCCESS;
                state.tasks.push(action.payload);
            })
            .addCase(sendTask.rejected, (state, action) => {
                state.taskStatus = STATUS.FAILED;
                state.error = action.payload;
            })

            // Fetch Tasks
            .addCase(getTask.pending, (state) => {
                state.taskStatus = STATUS.LOADING;
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.taskStatus = STATUS.SUCCESS;
                state.tasks = action.payload;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.taskStatus = STATUS.FAILED;
                state.error = action.payload;
            })

            // Fetch Single Task
            .addCase(getSingleTask.pending, (state) => {
                state.singleTaskStatus = STATUS.LOADING;
                state.singleTaskError = null;
            })
            .addCase(getSingleTask.fulfilled, (state, action) => {
                state.singleTaskStatus = STATUS.SUCCESS;
                state.singleTask = action.payload;
            })
            .addCase(getSingleTask.rejected, (state, action) => {
                state.singleTaskStatus = STATUS.FAILED;
                state.singleTaskError = action.payload;
            })

            // Edit Task
            .addCase(editTask.pending, (state) => {
                state.singleTaskStatus = STATUS.LOADING;
                state.singleTaskError = null;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.singleTaskStatus = STATUS.SUCCESS;
                // Update the task list with the edited task
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;  // Replace with the updated task
                }
            })
            .addCase(editTask.rejected, (state, action) => {
                state.singleTaskStatus = STATUS.FAILED;
                state.singleTaskError = action.payload;
            })

            .addCase(getProfile.pending, (state) => {
                state.singleTaskStatus = STATUS.LOADING;
                state.singleTaskError = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.singleTaskStatus = STATUS.SUCCESS;
                state.singleTask = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.singleTaskStatus = STATUS.FAILED;
                state.singleTaskError = action.payload;
            })
            // Delete Task
            .addCase(deleteTask.pending, (state) => {
                state.taskStatus = STATUS.LOADING;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.taskStatus = STATUS.SUCCESS;
                // Filter out the deleted task from the tasks array
                state.tasks = state.tasks.filter(task => task.id !== action.meta.arg);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.taskStatus = STATUS.FAILED;
                state.error = action.payload;
            });

    },
});

// Selectors
export const selectUserProfile = (state) => state.task.singleTask;
export const selectAllTasks = (state) => state.task.tasks;
export const selectSingleTask = (state) => state.task.singleTask;

export default taskSlice.reducer;
