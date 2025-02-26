const { error } = require("console");
//Min
function getMinNumber(num1, num2) {
    if(isNaN(num1) || isNaN(num2)){
        return {
            status: 400,
            data : {
                error: `both parameters should be numbers`,
            },
        };
    }return {
        status : 200,
        data: {min: Math.min(num1, num2)}
    };
}

//Max
function getMaxNumber(num1, num2) {
    if(isNaN(num1) || isNaN(num2)){
        return {
            status: 400,
            data : {
                error: `both parameters should be numbers`,
            },
        };
    }return {
        status : 200,
        data: {max: Math.max(num1, num2)}
    };
}

//Avg
function getAvgNumber(array) {
    let arrayAvg =[];
    arrayAvg = Array.from(array.matchAll(/\d+/g), match => parseFloat(match[0]))
    if(!arrayAvg){
        return {
            status: 400,
            data : {
                error: `both parameters should be numbers`,
            },
        };
    }
    let sum = arrayAvg.reduce((acc, curr) => acc + curr, 0);
    let average = sum / arrayAvg.length;
    return {
        status : 200,
        data: {Avg: average}
    };
}

//sort
function getSortNumber(array, type) {
    if (type !== 'asc' && type !== 'dec') {
        return {
            status: 400,
            data: {
                error: `Invalid input. 'array' should be a string of numbers and 'type' should be 'asc' or 'dec'.`,
            },
        };
    }

    const arrayAvg = (array.match(/\d+/g) || []).map(Number);

    if (arrayAvg.length === 0) {
        return {
            status: 400,
            data: {
                error: `No valid numbers found in the array string.`,
            },
        };
    }

    let sorted = type === 'asc'
        ? arrayAvg.sort((a, b) => a - b)
        : arrayAvg.sort((a, b) => b - a);

    return {
        status: 200,
        data: { sort: sorted },
    };
}

//Count
function getCountNumber(number , searchValue) {
        console.log("umber", number)
        const numbers = number.split(",").map(str => str.trim());
        const search = searchValue;
        console.log(numbers , search)
        const cleanedArray = numbers.map(item => item.replace(/"/g, ''));
        console.log(numbers , search)

        const filteredData = cleanedArray.filter(item => item.trim().toLowerCase() === search?.trim().toLowerCase());
        
        return {
            status: 200,
            data: { count: filteredData.length, matches: filteredData }
        };
}

module.exports = {getMinNumber,getMaxNumber, getAvgNumber,getSortNumber,getCountNumber};