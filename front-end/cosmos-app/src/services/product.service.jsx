import axios from "axios";

const baseUrl = "http://localhost:3001/products";

const CreateProduct = async (product) => {
    console.log("product", product);
    return axios.post(baseUrl, product);
};

export {CreateProduct};