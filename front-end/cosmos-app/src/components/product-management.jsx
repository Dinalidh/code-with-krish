import React from "react";
import { CreateProduct } from "../services/product.service";

function ProductManagement() {
  const [Id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log("Product Addedd successsfully");
    const product = {
        Id,
        items: [
            {
                name,
                price,
                quantity,
            },
        ],
    };
    const response = await CreateProduct(product);
    console.log(response.data);
};

  return (
    <>
      <div>
        <h2>Create New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <label for="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={Id}
            onChange={(e) => setId(e.target.value)}
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

          <label for="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <br />
          <input type="submit" value="Submit" Submit />
        </form>
      </div>
    </>
  );
}

export default ProductManagement;
