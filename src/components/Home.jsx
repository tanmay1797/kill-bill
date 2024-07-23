import { useState, useEffect } from "react";
// import MyChart from "./MyChart";
import MyChart from "./MyChart";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Circles } from "react-loader-spinner";

function Home() {
  const [totalAmount, setTotalAmount] = useState("");
  const [recentData, setRecentData] = useState("");

  const [thisMonthTotalPrice, setThisMonthTotalPrice] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getTotalInvoice = (invoices) => {
    let total = 0;
    invoices.map((item) => {
      total = total + item.itemPrice * item.itemQuantity;
    });
    setTotalAmount(total);
  };

  const getTwoMonthsData = (invoices) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(currentDate.getMonth() - 2);
    const two_months_ago = twoMonthsAgo.getMonth() + 1;

    const recentDataCalculated = invoices.filter((item) => {
      const itemMonth = new Date(item.invoiceDate).getMonth() + 1;
      return itemMonth >= two_months_ago && itemMonth <= currentMonth;
    });
    setRecentData(recentDataCalculated);
  };

  // const getLastTwoMonthsData = (data) => {
  //   const now = new Date();
  //   const twoMonthsAgo = new Date();
  //   twoMonthsAgo.setMonth(now.getMonth() - 2);
  //   data.filter((item) => new Date(item.date) >= twoMonthsAgo);
  // };

  const getThisMonthTotal = (data) => {
    const thisMonth = new Date().getMonth() + 1;
    let thisMonthTotal = 0;
    const recentDataCalculated = data.filter((item) => {
      return new Date(item.invoiceDate).getMonth() + 1 == thisMonth;
    });
    recentDataCalculated.forEach((element) => {
      thisMonthTotal = thisMonthTotal + element.totalPrice;
    });

    setThisMonthTotalPrice(thisMonthTotal);
  };

  // console.log(thisMonthTotalPrice);

  const getData = async () => {
    try {
      const userId = localStorage.getItem("uid");
      if (!userId) {
        console.log("No user ID found in local storage");
        return;
      }

      const dataQuery = query(
        collection(db, "invoices"),
        where("uid", "==", localStorage.getItem("uid"))
      );
      const querySnapshot = await getDocs(dataQuery);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoices(data);

      getTotalInvoice(data);
      getThisMonthTotal(data);
      getTwoMonthsData(data);
    } catch (error) {
      console.log("error fetching data", error);
    } finally {
      setLoading(false);
    }
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
    <div className="flex flex-col  bg-gray-400 min-h-screen w-full">
      <div className=" bg-gray-200 text-red-500 text-3xl font-semibold text-center py-2 px-6 shadow-md">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
      </div>

      <div className="flex flex-wrap md:flex-nowrap h-full w-full gap-3 justify-center items-center bg-gray-100 p-4">
        <div className="w-full md:w-1/3 h-3/4 text-center border-2 border-gray-300 p-4 bg-blue-100 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-blue-700 pb-8">Overall</h1>
          <span className="text-3xl lg:text-5xl  font-extrabold text-blue-700">
            {totalAmount}
          </span>
        </div>
        <div className="w-full md:w-1/3 h-3/4 text-center border-2 border-gray-300 p-4 bg-green-100 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-green-700 pb-8">
            Total Invoices
          </h1>
          <span className="text-3xl lg:text-5xl font-extrabold text-green-800">
            {invoices.length}
          </span>
        </div>
        <div className="w-full md:w-1/3 h-3/4 text-center border-2 border-gray-300 p-4 bg-yellow-100 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-yellow-700 pb-8">
            This Month Total
          </h1>
          <span className="text-3xl lg:text-5xl font-extrabold text-yellow-800">
            {thisMonthTotalPrice}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-around p-4 items-center bg-gray-100 ">
        <div className="w-full h-auto md:w-2/5 py-10 my-10 bg-white shadow-md rounded-lg ">
          <MyChart invoices={invoices} />
        </div>
        <div className="w-full md:w-2/5 h-4/5 bg-purple-100 text-center border-2 border-gray-300 flex flex-col gap-3 p-4 m-4 rounded-lg shadow-md">
          <h1 className="text-lg font-bold text-purple-700">Recent Invoices</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border-collapse">
              <thead className="bg-purple-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Item</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentData &&
                  recentData.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.itemName}</td>
                      <td className="py-2 px-4 border-b">{item.invoiceDate}</td>
                      <td className="py-2 px-4 border-b">
                        {item.itemQuantity * item.itemPrice}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
