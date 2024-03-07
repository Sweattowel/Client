import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/ContextProvider";
import axios from "axios";
import { Pagination } from "@mui/material";

export default function UserAccount() {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS
    const [cart, setCart, userID, setUserID, authenticated, setAuthenticated, superAuthenticated, setSuperAuthenticated, userName, setUserName] = useMyContext();
    const [orders, setOrders] = useState<any[]>([])
    const ordersPerPage = 8;
    const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
    const [orderCount, setOrderCount] = useState(0);

    const handleChangeOrdersPage = (
        event: React.ChangeEvent<unknown>,
        newPage: number
      ) => {
        setCurrentOrdersPage(newPage);
    };

    const getOrders = async () => {
        try {
          setOrders([])
          const response = await axios.post(`${serverAddress}/api/getOrders`, { userID: userID });
          if (response.status === 200) {
            console.log('Response Data:', response.data);
            let data = response.data
            setOrders(data)
            setOrderCount(data.length)
          } else if (response.status === 404) {
            console.log('No orders to collect');
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getOrders()
      },[])

      return (
        <div className="w-[80%] h-[90vh] m-auto bg-gray-400 rounded-lg justify-center">
            <h1 className="text-xl text-white text-center h-[5%]">
                User: {userName || 'N/a'}
            </h1>
          <div className="bg-BACKGROUND h-[80vh] justify-center">
            <h1 className="justify-center text-center text-2xl">Order History:</h1>
            <Pagination
                style={{ position: 'absolute', bottom: '10%', display: "flex", justifyContent: "center" }}
                count={Math.ceil(orderCount / ordersPerPage)}
                page={currentOrdersPage}
                onChange={handleChangeOrdersPage}
                variant="outlined"
            />
            {authenticated ? (
                orders.slice((currentOrdersPage - 1) * ordersPerPage, currentOrdersPage * ordersPerPage).map((order: any, index: number) => (
                <div key={index} className={ !order.completed ? "m-2 flex text-white justify-center text-center" : "opacity-60 m-2 flex  text-white justify-center text-center"}>
                    <h1 className="bg-gray-600 border-BLACK border-2 w-[25%]">Item ID : {order.itemID} </h1>
                    <h1 className="bg-gray-600 border-BLACK border-2 w-[25%]">Quantity : {order.quantity} </h1>
                    <h1 className="bg-gray-600 border-BLACK border-2 w-[25%]">Completed : {order.completed ? 'TRUE' : "FALSE"} </h1>
                </div>
                ))
            ) : null}
          </div>
        </div>
      );
}