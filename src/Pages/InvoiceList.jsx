import { useState, useEffect } from "react";
import Invoice from "./Invoice";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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
  };

  return (
    <div className="w-full">
      {invoices.map((item) => {
        return <Invoice item={item} key={item.id} getData={getData} />;
      })}
    </div>
  );
}

export default InvoiceList;
