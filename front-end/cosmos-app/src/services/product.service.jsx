import axios from "axios";

const baseUrl = "http://localhost:3001/products";

const CreateProduct = async (product) => {
    console.log("product", product);
    return axios.post(baseUrl, product);
};

const GetProducts = async () => {
    const result = await axios.get(baseUrl);
    console.log("pro dataaa"+ result.data);
    return result;
}

export {CreateProduct, GetProducts};