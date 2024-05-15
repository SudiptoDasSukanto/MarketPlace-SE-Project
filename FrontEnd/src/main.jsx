import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/dashboard/ErrorPage';
import Home from './components/dashboard/Home';
import HomeCatagories from './components/dashboard/HomeCatagories';
import Login from './components/login/Login';
import Register from './components/Registration form/Register';
import Addjob from './components/PrivateRoute/Addjob';
import Mypostedjob from './components/PrivateRoute/Mypostedjob';
import Mybid from './components/PrivateRoute/Mybid';
import Bidrequest from './components/PrivateRoute/Bidrequest';
import Context from './components/Allprovider/Context';
import Bid from './components/PrivateRoute/Bid';
import Updatejob from './components/PrivateRoute/Updatejob';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path : "/",
        element: <HomeCatagories></HomeCatagories>
      },
      {
        path : "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/addjob",
        element: (
          <PrivateRoute>
            <Addjob></Addjob>
          </PrivateRoute>
        )
      },
      {
        path: "/mypostedjob",
        element: (
          <PrivateRoute>
            <Mypostedjob></Mypostedjob>
          </PrivateRoute>
        )
      },
      {
        path: "/mybid",
        element:(
          <PrivateRoute>
            <Mybid></Mybid>
          </PrivateRoute>
        ) 
      }
      ,
      {
        path: "/bidrequest",
        element: (
          <PrivateRoute>
            <Bidrequest></Bidrequest>
          </PrivateRoute>
        )
      },
      {
        path: "/bid/:id",
        element: (
          <PrivateRoute>
            <Bid></Bid>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
        fetch(`http://127.0.0.1:8000/job/${params.id}`),
      },
      {
        path: "/updatejob/:id",
        element: (
          <PrivateRoute>
            <Updatejob></Updatejob>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
        fetch(`http://127.0.0.1:8000/job/${params.id}`),
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <+>
        <RouterProvider router={router} />
    </Context>
  </React.StrictMode>,
)
