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
  Navigate,
} from "react-router-dom";
import InvoiceDetail from "./Pages/InvoiceDetail";
import Header from "./components/Header";
import Profile from "./Pages/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

// const router = createBrowserRouter([
//   // { path: "/sign-in", element: <SignIn /> },

//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/profile",
//         element: <Profile />,
//       },
//       { path: "/", element: <Home /> },
//       { path: "/new-invoice", element: <NewInvoice /> },
//       { path: "/invoice", element: <Invoice /> },
//       {
//         path: "/invoice-list",
//         element: <InvoiceList />,
//       },
//       {
//         path: "invoice/:id",
//         element: <InvoiceDetail />,
//       },
//     ],
//   },
//   { path: "/sign-in", element: <SignIn /> },
//   { path: "/sign-up", element: <SignUp /> },
// ]);

const isAuthenticated = () => {
  return localStorage.getItem("uid") !== null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? (
      <Layout />
    ) : (
      <Navigate to="/sign-in" replace />
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

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
