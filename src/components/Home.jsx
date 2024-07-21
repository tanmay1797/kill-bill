import { useState, useEffect } from "react";
// import MyChart from "./MyChart";
import MyChart from "./MyChart";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [totalAmount, setTotalAmount] = useState("");
  const [recentData, setRecentData] = useState("");
  // const [thisMonthData, setThisMonthsData] = useState([]);
  const [thisMonthTotalPrice, setThisMonthTotalPrice] = useState([]);
  const [invoices, setInvoices] = useState([]);

  console.log(invoices);

  useEffect(() => {
    getData();
    // getTotalInvoice();
    // getLastTwoMonthsData(invoices);
    // getTwoMonthsData(invoices);
    // getThisMonthTotal(invoices);
    // month_wise_collection(invoices);
  }, []);

  const getTotalInvoice = (invoices) => {
    let total = 0;
    invoices.map((item) => {
      total = total + item.itemPrice * item.itemQuantity;
    });
    setTotalAmount(total);
  };

  console.log(invoices);
  console.log(totalAmount);

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
    }
  };

  return (
    <div className="flex flex-col  bg-gray-400 min-h-screen w-full">
      <div className=" bg-gray-400 flex h-full w-full gap-3 justify-center items-center">
        <div className="w-1/3 h-[50%] text-center border-2">
          <h1>OverAll</h1>
          <span>{totalAmount}</span>
        </div>
        <div className="w-1/3 h-[50%] text-center border-2">
          <h1>Total Invoices</h1>
          {invoices.length}
        </div>
        <div className="w-1/3 h-[50%] text-center border-2 flex gap-3 flex-col p-4 m-4">
          {" "}
          <h1>This month Total</h1>
          {thisMonthTotalPrice}
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className=" bg-white w-2/5 py-10 my-10">
          <MyChart invoices={invoices} />
        </div>
        <div className="w-2/5 h-[80%] bg-green-500 text-center border-2 flex gap-3 flex-col p-4 m-4">
          <h1>Recent Invoices</h1>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentData &&
                recentData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.itemName}</td>
                      <td>{item.invoiceDate}</td>
                      <td>{item.itemQuantity * item.itemPrice}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
