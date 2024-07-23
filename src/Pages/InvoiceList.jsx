import { useState, useEffect } from "react";
import Invoice from "./Invoice";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { length } from "./../../node_modules/stylis/src/Tokenizer";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    getData();
  }, [sortOption]);

  const getData = async () => {
    try {
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
      // setInvoices(data);
      sortInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortInvoices = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOption === "amount") {
        // Sort by amount: Calculate the total amount for each invoice and compare
        return b.itemPrice * b.itemQuantity - a.itemPrice * a.itemQuantity;
      } else {
        // Default: Sort by date (most recent first)
        return new Date(b.invoiceDate) - new Date(a.invoiceDate);
      }
    });
    setInvoices(sortedData);
  };

  return loading ? (
    <div className="w-full h-full flex justify-center items-center p-80 ">
      <Circles
        height="80"
        width="80"
        color="#A52A2A	"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <div className="w-full">
      {invoices.length > 1 && (
        <div className="flex justify-center p-4 md:justify-end">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 "
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      )}
      {invoices.map((item) => {
        return <Invoice item={item} key={item.id} getData={getData} />;
      })}
      {invoices.length < 1 && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            You have no invoices till now
          </p>
          <button
            onClick={() => {
              navigate("/new-invoice");
            }}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            Create New Invoice
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;
