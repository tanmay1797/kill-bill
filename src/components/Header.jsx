import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
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
    <div className="min-h-screen flex flex-row">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Invoice Dashboard</h1>
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          Welcome {userName}
        </h1>
        <ul>
          <Link to="/">
            <div href="#" className="hover:underline v">
              Home
            </div>
          </Link>
          <Link to="/invoice-list">
            <div href="#" className="hover:underline">
              Invoice List
            </div>
          </Link>
          <Link to="/new-invoice">
            <div href="#" className="hover:underline">
              Create Invoice
            </div>
          </Link>
          <Link to="/profile">
            <div href="#" className="hover:underline">
              Profile
            </div>
          </Link>

          <div
            href="#"
            className="hover:underline text-xl text-red-400 cursor-pointer"
            onClick={signOutUser}
          >
            Sign Out
          </div>
        </ul>
      </aside>
    </div>
  );
}

export default Header;
