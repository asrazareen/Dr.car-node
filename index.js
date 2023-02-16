const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const secret = "CARSERVICE";
const UserRoute = require("./routes/user")
const OrderRoute = require("./routes/orders")
const Port = 3000 || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
 

app.use("/orders", (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
      
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                console.log(err);
               return res.status(403).json({
                status: "Failed",
                message: "Token is not valid"
                });
            }
            req.user = decoded.data;
            next();
          });

    }else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})
app.use("/orders",OrderRoute)
app.use("/user",UserRoute)


mongoose.connect(
  "mongodb+srv://asrazareen:asra1999@cluster0.8bvzl30.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Connected to DB")
);

app.listen(Port,()=>{console.log(`server is up at port no. ${Port}`)})