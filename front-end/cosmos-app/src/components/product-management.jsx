import React, { useEffect } from "react";
import { CreateProduct, GetProducts } from "../services/product.service";

function ProductManagement() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [product, setProducts] = React.useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log("Product Addedd successsfully");
    const product = {
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

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
        const response = await GetProducts();
        console.log("datapro", response.data);
        setProducts(response.data);
    }catch (error) {
        console.log(error.name)
    }
};

  return (
    <>
      <div>
        <h2>Create New Product</h2>
        <form onSubmit={handleProductSubmit}>
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
      <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            { product && 
                product.map((pro) => (
                    <tr>
                        <td>{pro.name}</td>
                        <td>{pro.price}</td>
                        <td>{pro.quantity}</td>
                    </tr>
                )) }
        </table>
      </div>
    </>
  );
}

export default ProductManagement;
