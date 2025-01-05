import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/Status'; // Ensure STATUS is properly imported
import axios from 'axios';

const initialState = {
    Admin: [], // List of admin users
    singleuser: null, // A single user's details
    AdminStatus: STATUS.IDLE, // Status for admin fetching
    singleuserStatus: STATUS.IDLE, // Status for single user fetching
    error: null, // Error for admin fetching
    singleUserError: null, // Error for single user fetching
};

// Thunk to fetch all admin users
export const getUser = createAsyncThunk(
    'admin/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://new-todo-app-backend-2jg4.onrender.com/api/auth/adminUsers', {
                withCredentials: true, // Include cookies for authentication
            });
            return response.data.data; // Ensure this path matches the API response
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch users");
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            console.log('Deleting user with ID:', id); // Add this log to check if ID is passed
            const response = await axios.delete(`https://new-todo-app-backend-2jg4.onrender.com/api/auth/adminUsers/${id}`, {
                withCredentials: true,
            });
            dispatch(getUser()); // Refresh the user list
            console.log('User deleted successfully'); // Check this log in the console
            return response.data.data;
        } catch (error) {
            console.error('Error deleting user:', error); // Check this error in console
            return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
);



// Redux slice
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {}, // No additional reducers for now
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.AdminStatus = STATUS.LOADING; // Update status to loading
                state.error = null; // Clear previous errors
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.AdminStatus = STATUS.SUCCESS; // Update status to success
                state.Admin = action.payload; // Store fetched admin users
            })
            .addCase(getUser.rejected, (state, action) => {
                state.AdminStatus = STATUS.FAILED; // Update status to failed
                state.error = action.payload; // Store error message
            })
            .addCase(deleteUser.pending, (state) => {
                state.AdminStatus = STATUS.LOADING;
                state.singleUserError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.AdminStatus = STATUS.SUCCESS;
                state.Admin = state.Admin.filter(user => user._id !== action.payload._id); 
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.AdminStatus = STATUS.FAILED;
                state.singleUserError = action.payload;
            });
    },
});

// Selector to get all admin users
export const selectAllUsers = (state) => state.admin.Admin;

export default adminSlice.reducer;
