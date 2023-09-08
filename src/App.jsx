import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import RootLayout from "./pages/Root";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/create-listing",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <CreateListing />,
          },
        ],
      },
      // TODO: CreateListing submit 이후 rent/sale dynamic route추가
      {
        path: "/category",
        // element: , 
        children: [
          {
            path: "sale",
            // element: 
          },
          {
            path: "sale/:id"
          },
          {
            path: "rent",
          },
          {
            path: "rent/:id"
          },
        ]
      },
      {
        path: "/edit-listing/:id",
        element: <PrivateRoute/>,
        children: [
          {
            index: true,
            element: <EditListing/>
          }
        ]
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
