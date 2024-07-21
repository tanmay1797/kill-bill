import { createContext, useEffect } from "react";
import { useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const InvoiceContext = createContext();

function Provider({ children }) {
  const [invoices, setInvoices] = useState([
    // {
    //   clientEmail: "tanmaY@gmail.com",
    //   clientName: "tanmay",
    //   clientPhone: 123456,
    //   invoiceDate: "2024-07-18",
    //   itemName: "tv",
    //   itemPrice: 20000,
    //   itemQuantity: 2,
    //   id: 1,
    // },
  ]);

  // const addInvoice = (
  //   clientName,
  //   clientEmail,
  //   clientPhone,
  //   invoiceDate,
  //   itemName,
  //   itemQuantity,
  //   itemPrice
  // ) => {
  //   setInvoices([
  //     ...invoices,
  //     {
  //       clientName,
  //       clientEmail,
  //       clientPhone,
  //       invoiceDate,
  //       itemName,
  //       itemQuantity,
  //       itemPrice,
  //     },
  //   ]);
  // };

  // console.log(invoices);

  const addInvoice = async (
    clientName,
    clientEmail,
    clientPhone,
    invoiceDate,
    itemName,
    itemQuantity,
    itemPrice,
    totalPrice
  ) => {
    const data = await addDoc(collection(db, "invoices"), {
      invoiceDate: invoiceDate,
      itemName: itemName,
      itemQuantity: itemQuantity,
      itemPrice: itemPrice,
      clientName: clientName,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
      totalPrice: totalPrice,
      uid: localStorage.getItem("uid"),
    });
    console.log(data);
  };

  // const addUser = async (email, username, user) => {
  //   const data = await addDoc(collection(db, "user"), {
  //     email: email,
  //     username: username,
  //     uid: user.uid,
  //   });
  //   console.log(data);
  // };

  return (
    <InvoiceContext.Provider value={{ addInvoice, invoices }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export { Provider };
export { InvoiceContext };
