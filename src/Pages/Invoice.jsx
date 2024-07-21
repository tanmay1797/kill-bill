import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function Invoice({ item, getData }) {
  const navigate = useNavigate();
  const _id = item.itemName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/invoice/${rootId}`, {
      state: {
        item: item,
      },
    });
  };

  const handleDelete = async (item) => {
    const isSure = window.confirm("are you sure want to delete");
    if (isSure) {
      try {
        await deleteDoc(doc(db, "invoices", item.id));
        getData();
      } catch {
        window.alert("something is wrong");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto text-black rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 bg-white-100 flex justify-around">
      <div className="p-8 flex items-center">
        <div>
          <div className=" tracking-wide text-sm font-semibold">
            {item.invoiceDate}
          </div>
          <div>
            <p className="mt-2 text-gray-500 text-sm  ">{item.itemName}</p>
            <p className="mt-2 text-gray-500  ">{item.itemPrice}</p>
          </div>
        </div>
      </div>
      <button onClick={() => handleDelete(item)}>Delete</button>

      <button onClick={handleDetails}>View</button>
    </div>
  );
}

export default Invoice;
