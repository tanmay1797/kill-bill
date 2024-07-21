import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function InvoiceDetail() {
  const location = useLocation();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    itemName,
    clientName,
    itemQuantity,
    itemPrice,
    invoiceDate,
    clientEmail,
    clientPhone,
  } = location.state.item;
  console.log(
    itemName,
    clientName,
    itemQuantity,
    itemPrice,
    invoiceDate,
    clientEmail,
    clientPhone
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div
        ref={componentRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Product Name: {itemName}</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Invoice Date:</h3>
          <p className="text-gray-700">{invoiceDate}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Price:</h3>
          <p className="text-gray-700">{itemPrice}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Quantity:</h3>
          <p className="text-gray-700">{itemQuantity}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Total Price:</h3>
          <p className="text-gray-700">{itemPrice * itemQuantity}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Client Details:</h3>
          <p className="text-gray-700">Client Name: {clientName}</p>
          <p className="text-gray-700">Client Email: {clientEmail}</p>
          <p className="text-gray-700">Client Phone: {clientPhone}</p>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Print Product Details
      </button>
    </div>
  );
}

export default InvoiceDetail;
