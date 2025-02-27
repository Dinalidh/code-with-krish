const express = require('express');
const {getMinNumber, getMaxNumber, getAvgNumber, getSortNumber,getCountNumber} = require('./util.js')

const app = new express();
const port = 3000;
const greeting = {message: "hello node"}

//Min
app.get('/number/min',(req, res)=>{

    const num1 = parseFloat (req.query.num1);
    const num2 = parseFloat (req.query.num2);

    const result = getMinNumber(num1, num2);
    res.status(result.status).json(result.data);
})

//Max
app.get('/number/max',(req, res)=>{

    const num1 = parseFloat (req.query.num1);
    const num2 = parseFloat (req.query.num2);

    const result = getMaxNumber(num1, num2);
    res.status(result.status).json(result.data);
   
})

//avg
app.get('/number/avg',(req, res)=>{

console.log(req.query.numbers)
    const result = getAvgNumber(req.query.numbers)

    res.status(result.status).json(result.data);
})

//Sort
app.get('/number/sort',(req, res)=>{

    const array = req.query.numbers;
    const type =  req.query.type;

    const result = getSortNumber(array, type);
    res.status(result.status).json(result.data);
  
})

//Count
app.get('/number/count',(req, res)=>{

    const numbers = req.query.numbers;
    const search =req.query.search;

    const result = getCountNumber(numbers, search);
    res.status(result.status).json(result.data);
   
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});