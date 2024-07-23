// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import Invoices from "./Pages/Invoices";
// import NewInvoice from "./Pages/NewInvoice";
import Home from "./components/Home";
import Invoice from "./Pages/Invoice";
import InvoiceList from "./Pages/InvoiceList";
import NewInvoice from "./Pages/NewInvoice";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  // Navigate,
} from "react-router-dom";
import InvoiceDetail from "./Pages/InvoiceDetail";
import Header from "./components/Header";
import Profile from "./Pages/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "new-invoice", element: <NewInvoice /> },
      { path: "invoice", element: <Invoice /> },
      { path: "invoice-list", element: <InvoiceList /> },
      { path: "invoice/:id", element: <InvoiceDetail /> },
      { path: "/", element: <Home /> },
    ],
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
