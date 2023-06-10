require("dotenv").config();
const axios = require('axios');

const url = process.env.URL; 

const transformString = (string) => {
    if (string.indexOf(' ') > -1) {
        const list = string.split(' ');
        var newStr = list[0];
        for (var i = 1; i < list.length; i++) {
            newStr += ` + ${list[i]}`;
        }
        return newStr;
    }
    return string;
}

module.exports.getApproxMatch = (input) => {
    let transformed = transformString(input);
    return axios.get(`${url}/approximateTerm.json?term=${transformed}`)
}




