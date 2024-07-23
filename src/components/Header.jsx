import { NavLink, useNavigate } from "react-router-dom";
// import Home from "./Home";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        navigate("/sign-in");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    // <div className="min-h-screen flex flex-row">
    <div className="bg-gray-800 text-white w-full md:w-1/4 p-4">
      <aside className=" bg-gray-800 text-white p-6 sticky top-0 h-screen overflow-y-auto">
        {/* <h1 className="text-5xl font-semibold mb-6 bg-amber-900 rounded-2xl	text-center p-2">
          Kill-Bill
        </h1> */}
        <span className="ml-2 px-2 py-0.1 bg-red-600 text-white text-sm font-semibold rounded-full">
          BETA
        </span>
        <NavLink to="/">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl cursor-pointer text-center p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Kill-Bill
          </h1>
        </NavLink>

        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Welcome,
          <span className="text-red-600 font-semibold italic text-shadow-md">
            {" "}
            <span>{userName}</span>
          </span>
        </h1>
        <div className="flex flex-col gap-[50px] ">
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl hover:text-yellow-600 transition-colors ${
                  isActive
                    ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                    : ""
                }`
              }
            >
              <div href="#" className="h-[25%] mb-14 text-xl ">
                Home
              </div>
            </NavLink>
            <NavLink
              to="/invoice-list"
              className={({ isActive }) =>
                `text-xl hover:text-yellow-600 transition-colors ${
                  isActive
                    ? "text-yellow-600 font-bold border-b-2 border-yellow-600 "
                    : ""
                }`
              }
            >
              <div href="#" className=" mb-14 text-xl">
                Invoice List
              </div>
            </NavLink>
            <NavLink
              to="/new-invoice"
              className={({ isActive }) =>
                `text-xl hover:text-yellow-600 transition-colors ${
                  isActive
                    ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                    : ""
                }`
              }
            >
              <div href="#" className=" mb-14 text-xl">
                Create Invoice
              </div>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-xl hover:text-yellow-600 transition-colors ${
                  isActive
                    ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                    : ""
                }`
              }
            >
              <div href="#" className=" mb-14 text-xl">
                Profile
              </div>
            </NavLink>

            <div
              href="#"
              className=" cursor-pointer bg-amber-900 text-center text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out hover:bg-red-700 hover:text-gray-200"
              onClick={signOutUser}
            >
              Sign Out
            </div>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Header;
