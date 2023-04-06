const express = require("express");
const Orders = require("../models/order");
const User = require("../models/user")
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json())
app.use(cors());
app.use(fileUpload());

app.get("/user", async (req, res) => {
    const userid = req.user;
    console.log(userid)
    const user = await User.findOne({ _id: userid });
    console.log(user)
//   res.status(200).json({
//     name: user.name,
//   });
});

app.get("/",async (req,res)=>{
    try{
        const userid = req.user
        const user = await User.findOne({ _id: userid });
        const page = req.query.page || 1;
        const order = await Orders.find({ user: user.name }).skip((page - 1) * 5).limit(5);
        const length = await Orders.find({ user: user.name }).count();
        res.json({
            order,
            length
        })
    }catch(e){
    }
})

app.get("/:id", async (req, res) => {
    const data = await Orders.findOne({ _id: req.params.id });
    res.status(200).json(data);
})

app.post("/" , async (req,res) => {
    try{
        const { status, services, user, address, brand, model, fuel } = req.body;
        await Orders.create({
          status,
          services,
          user, 
          address, 
          brand,
          model,
          fuel,
        });
        res.json({
            message:"Service Order Placed",
        })
    }catch(e){
       res.status(404).json({
        message:e.message
       })
    }
})

app.delete("/:id", async (req,res)=>{
   await Orders.deleteOne({_id:req.params.id})
    res.json({
        message:"Data Removed succesfully"
    })
})


module.exports = app;