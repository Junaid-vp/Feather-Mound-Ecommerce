import React, { createContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/UseFetch";
import { api } from "../../Api/Axios";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const { datas } = useFetch("/users");

  const [AllOrder, setAllOrder] = useState([]);

  useEffect(() => {
    const Users = datas?.filter((user) => user.role === "user");

    const FlatOrder = Users.flatMap((user) =>
      user.order?.flatMap((ord) =>
        ord.items?.map((it) => ({
          ...it,
          userId: user.id,
          orderId: ord.id,
          userName:user.FirstName+" "+user.LastName
        }))
      )
    );
    setAllOrder(FlatOrder);
  }, [datas]);

  const UpdateStatus = async (userId, orderId, itemId, newStatus) => {
    try {
      setAllOrder((prev) =>
        prev.map((item) =>
          item.userId === userId &&
          item.orderId === orderId &&
          item.item_id === itemId
            ? { ...item, status: newStatus }
            : item
        )
      );

      const res =  await api.get(`/users/${userId}`);
      const User = res.data;
      const Orders = User.order;
      const UpdateStatus = Orders.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          items: order.items.map((it) =>
            it.item_id === itemId ? { ...it, status: newStatus } : it
          ),
        };
      });

      await api.patch(`/users/${userId}`, { order: UpdateStatus });
    } catch (e) {
      console.log("Something Error  on Updating Status", e);
    }
  };

  return (
    <OrderContext.Provider value={{ AllOrder, UpdateStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
