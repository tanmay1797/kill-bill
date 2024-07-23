import { useState } from "react";
import { useContext } from "react";
import { InvoiceContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const { addInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  // console.log(invoices);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = itemPrice * itemQuantity;
    addInvoice(
      clientName,
      clientEmail,
      clientPhone,
      invoiceDate,
      itemName,
      itemQuantity,
      itemPrice,
      totalPrice
    );
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setInvoiceDate("");
    setItemName("");
    setItemQuantity("");
    setItemPrice("");
    navigate("/invoice-list");
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-evenly bg-gray-100 p-6 w-full">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Generate Invoice
        </h2>
        <div className="mb-4">
          <label htmlFor="clientName" className="block text-gray-700">
            Client Name:
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="clientEmail" className="block text-gray-700">
            Client Email:
          </label>
          <input
            type="email"
            id="clientEmail"
            name="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="clientEmail" className="block text-gray-700">
            Client Phone:
          </label>
          <input
            type="text"
            id="clientPhone"
            name="clientEmail"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="invoiceDate" className="block text-gray-700">
            Invoice Date:
          </label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={invoiceDate}
            onChange={(e) => {
              setInvoiceDate(e.target.value);
            }}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <h3 className="text-xl font-bold mb-2">Items</h3>
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
