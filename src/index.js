const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

function isUnderflow(parameter) {
  if (parameter < -1000000) {
    return true;
  }
  return false;
}

function isOverflow(parameter) {
  if (parameter > 1000000) {
    return true;
  }
  return false;
}

app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

//custom middleware
app.use((req, res, next) => {
    const {num1, num2} = req.body;
    if(typeof num1 === "string" || typeof num2 === "string"){
        res.send({
            status : "error",
            message : "Invalid data types"
        });
    }
    else if(isOverflow(num1) || isOverflow(num2)){
        res.send({
            status : "error",
            message : "Overflow"
        });
    }
    else if(isUnderflow(num1) || isUnderflow(num2)){
        res.send({
            status : "error",
            message : "Underflow"
        })
    }
    else{
        next();
    }
});





app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/add", (req, res) => {
    const {num1, num2} = req.body;
    const result = num1 + num2;

    if(isUnderflow(result)){
        res.send({
            status : "error",
            message : "Underflow"
        })
    }
    else if(isOverflow(result)){
        res.send({
            status : "error",
            message : "Overflow"
        })
    }
    else{
        res.send({
            status : "success",
            message : "the sum of given two numbers",
            sum : result
        })
    }
});



app.post("/sub", (req, res) => {
    const {num1, num2} = req.body;
    const result = num1 - num2;

    if(isUnderflow(result)){
        res.send({
            status : "error",
            message : "Underflow"
        })
    }
    else if(isOverflow(result)){
        res.send({
            status : "error",
            message : "Overflow"
        })
    }
    else{
        res.send({
            status : "success",
            message : "the difference of given two numbers",
            sum : result
        })
    }
});



app.post("/multiply", (req, res) => {
    const {num1, num2} = req.body;
    const result = num1 * num2;

    if(isUnderflow(result)){
        res.send({
            status : "error",
            message : "Underflow"
        })
    }
    else if(isOverflow(result)){
        res.send({
            status : "error",
            message : "Overflow"
        })
    }
    else{
        res.send({
            status : "success",
            message : "The product of given numbers",
            sum : result
        })
    }
});



app.post("/divide", (req, res) => {
    const {num1, num2} = req.body;
    const result = num1 / num2;

    if(num2 === 0){
        res.send({
            status : "error",
            message : "Cannot divide by zero"
        })
    }
    else if(isUnderflow(result)){
        res.send({
            status : "error",
            message : "Underflow"
        })
    }
    else if(isOverflow(result)){
        res.send({
            status : "error",
            message : "Overflow"
        })
    }
    else{
        res.send({
            status : "success",
            message : "The division of given numbers",
            sum : result
        })
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
