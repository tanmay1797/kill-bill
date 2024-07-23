import { useNavigate } from "react-router-dom";
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
    <div className="max-w-md mx-auto text-black rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-5 bg-gray-200 flex flex-col md:flex-row">
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <div className="tracking-wide text-xl font-semibold text-gray-700 w-full p-2">
            Date: {item.invoiceDate}
          </div>
          <div className="mt-2">
            <p className="text-gray-800 font-semibold text-2xl p-3">
              Item: {item.itemName}
            </p>
            <p className="text-gray-800 text-xl font-semibold p-3">
              Price: {item.itemPrice}
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleDelete(item)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
          >
            Delete
          </button>
          <button
            onClick={handleDetails}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
