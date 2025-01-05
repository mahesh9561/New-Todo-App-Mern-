import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProtectedRoute, UserProtectedRoute } from "./components/Auth/PrivateRoute";
import AdminDashboard from "./components/Admin";
import UserDashboard from "./components/User";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Header from "./components/Header";
import AllTasks from './components/AllTasks'
import SingleTask from "./components/SingleTask";
import UpdateTask from "./components/UpdateTask";
import Profile from "./components/Profile";
import ViewAllUser from "./components/Admin/ViewAllUser";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/view-all-tasks" element={<AdminProtectedRoute />}>
          <Route index element={<ViewAllUser />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserProtectedRoute />}>
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="/tasks" element={<UserProtectedRoute />}>
          <Route index element={<AllTasks />} />
        </Route>
        <Route path="/tasks/:id" element={<UserProtectedRoute />}>
          <Route index element={<SingleTask />} />
        </Route>
        <Route path="/editTask/:id" element={<UserProtectedRoute />}>
          <Route index element={<UpdateTask />} />
        </Route>
        <Route path="/profile" element={<UserProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
