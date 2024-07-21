import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const UserProfile = () => {
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [userTotal, setUserTotal] = useState([]);

  useEffect(() => {
    getUserData();
    getInvoiceData();
  }, []);

  const getUserData = async () => {
    const dataQuery = query(
      collection(db, "users"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(dataQuery);
    // const data = querySnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("data", data[0]);
    setUserName(data[0].username);
    setUserEmail(data[0].email);
  };

  const getInvoiceData = async () => {
    const dataQuery = query(
      collection(db, "invoices"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(dataQuery);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("data", data);
    setInvoices(data);
    calculateUserInvoiceTotal(data);
  };

  const calculateUserInvoiceTotal = (data) => {
    let total = 0;
    data.forEach((element) => {
      total = total + element.totalPrice;
    });
    setUserTotal(total);
  };

  return (
    <div className="flex justify-center items-center h-screen w-[100%] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-3xl w-full">
        <div className="flex items-center space-x-4 mb-6">
          <img
            // src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold">{userName}</h2>
            {/* <p className="text-gray-600">{user.position}</p> */}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <ul className="text-gray-700">
            <li>Email: {userEmail}</li>
            <li>Phone: XXXXXXXXXX</li>
            <li>Location: India</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <div className="flex space-x-4">
            <div className="flex-1 bg-blue-100 p-4 rounded-lg">
              <h4 className="text-xl font-bold">{invoices.length}</h4>
              <p className="text-gray-600">Total Invoices</p>
            </div>
            <div className="flex-1 bg-green-100 p-4 rounded-lg">
              <h4 className="text-xl font-bold">{userTotal}</h4>
              <p className="text-gray-600">Total Amount</p>
            </div>
          </div>
        </div>
        <div>
          {/* <h3 className="text-lg font-semibold mb-2">Recent Invoices</h3> */}
          {/* <ul className="text-gray-700 space-y-2">
            {user.recentInvoices.map((invoice) => (
              <li
                key={invoice.id}
                className="flex justify-between p-2 bg-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{invoice.id}</p>
                  <p className="text-sm">{invoice.date}</p>
                </div>
                <div>
                  <p className="font-semibold">{invoice.amount}</p>
                  <p
                    className={`text-sm ${
                      invoice.status === "Paid"
                        ? "text-green-500"
                        : invoice.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {invoice.status}
                  </p>
                </div>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
