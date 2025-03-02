import axios from "axios";

const baseUrl = "http://localhost:3000/orders";

const CreateOrder = async (order) => {
  console.log("service", order);
  return axios.post(baseUrl, order);
};

const GetOrders = async () => {
  const result = await axios.get(baseUrl);
  console.log("dataaaaaaaaaaaaaaaaa"+result.data);
  return result;
};

export { CreateOrder, GetOrders };
