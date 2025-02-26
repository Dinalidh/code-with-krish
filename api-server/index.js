const express = require('express');
const {getMinNumber} = require('./util.js')

const app = new express();
const port = 3000;
const greeting = {message: "hello node"}
app.get('/number/min',(req, res)=>{

    const num1 = parseFloat (req.query.num1);
    const num2 = parseFloat (req.query.num2);

    const result = getMinNumber(num1, num2);
    res.status(result.status).json(result.data);
    // if(isNaN(num1) || isNaN(num2)){
    //    res.json("Both must be numbers")
    // }else {
    //     res.json({min: num1 > num2 ? num2 : num1})

    // }

    // res.json({min: Math.min(num1,num2)});
   
    // res.json(greeting)
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});