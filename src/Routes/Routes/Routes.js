import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Apointment from "../../Pages/Apointment/Apointment/Apointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <PrivateRoute><Apointment></Apointment></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                errorElement: <DisplayError></DisplayError>,
                element: <MyAppointment></MyAppointment>
            },
            {
                path : '/dashboard/allusers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path : '/dashboard/adddoctor',
                element: <AdminRoutes><AddDoctor></AddDoctor></AdminRoutes>
            },
            {
                path : '/dashboard/managedoctors',
                element: <AdminRoutes><ManageDoctors></ManageDoctors></AdminRoutes>
            },
            {
                path : '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=> fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    }
])

export default router;