import React, { useEffect } from "react";
import { GetOrders, CreateOrder } from "../services/order.service";

export default function OrderManagement() {
  const [customerId, setCustomerId] = React.useState("");
  const [productId, setProductrId] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQTY] = React.useState("");
  const [orders, setOrders] = React.useState("");

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    console.log("Order Submitted");
    const order = {
      customerId,
      items: [
        {
          productId,
          price,
          quantity: qty,
        },
      ],
    };
    // console.log(order)
    const response = await CreateOrder(order);
    console.log(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await GetOrders();
      console.log("dataSS", response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error.name);
    }
  };

  return (
    <>
      <p>Create Order</p>
      <form onSubmit={handleOrderSubmit}>
        <label for="cus_id">Customer ID</label>
        <input
          type="text"
          id="cus_id"
          name="cus_id"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
        <br />
        <label for="prod_id">Product ID</label>
        <input
          type="text"
          id="prod_id"
          name="prod_id"
          value={productId}
          onChange={(e) => setProductrId(e.target.value)}
          required
        />
        <br />
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />
        <label for="qty">QTY</label>
        <input
          type="text"
          id="qty"
          name="qty"
          value={qty}
          onChange={(e) => setQTY(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Submit" Submit />
      </form>
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Order Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {orders &&
            orders.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.customerId}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
}
