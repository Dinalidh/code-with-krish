import React, { useEffect } from "react";
import { GetCustomers, CreateCustomer } from "../services/customer.service";
import './customer.css';


function CustomerManagement() {
    const [customerId, setCustomerId] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAdress] = React.useState("");
    const [customer, setCustomers] = React.useState("");

    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        console.log("Customer Added successsfully");
        const customer = {
            customerId,
            items: [
                {
                    name,
                    email,
                    address,
                },
            ],
        };
        const response = await CreateCustomer(customer);
        console.log(response.data);
    };
    useEffect(() => {
        fetchCustomers();
    },[]);

    const fetchCustomers = async () => {
        try {
            const response = await GetCustomers();
            console.log("datacus", response.data);
            setCustomers(response.data);
        }catch (error) {
            console.log(error.name)
        }
    };
  return (
    <>
    <div>
    <h2>Add New Customer</h2>
      <form onSubmit={handleCustomerSubmit}>
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
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAdress(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Submit" Submit />
      </form>
    </div>
     
      <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            { customer && 
                customer.map((cus) => (
                    <tr>
                        <td>{cus.id}</td>
                        <td>{cus.customerId}</td>
                        <td>{cus.status}</td>
                    </tr>
                )) }
        </table>
      </div>
    </>
  );
}

export default CustomerManagement;