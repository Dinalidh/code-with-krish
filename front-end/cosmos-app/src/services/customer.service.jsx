import axios from "axios";

const baseUrl = "http://localhost:3002/customers";

const CreateCustomer = async (customer) => {
    console.log("customer", customer);
    return axios.post(baseUrl, customer);
};

const GetCustomers = async () => {
    const result = await axios.get(baseUrl);
    console.log("cus dataaa"+ result.data);
    return result;
}

export {CreateCustomer, GetCustomers};