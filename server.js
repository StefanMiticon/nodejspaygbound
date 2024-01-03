const express = require('express');
const mongoose = require('mongoose');
var admin = require("firebase-admin");
var serviceAccount = require("./membership-92638-firebase-adminsdk-qpzi6-1245779aab.json");
const Product = require('./models/productModel');
const Device = require('./models/deviceModel');
const RelayStatus = require('./models/relayStatusModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({exdtended: false}));

mongoose
.connect('mongodb+srv://Cluster82349:Node123mrs@cluster82349.y2zr4ot.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=> {
    console.log('connected to MongoDB');
    app.listen(3000, ()=>{
        console.log("Node API app is listen on port 3000");
    });
})
.catch((error)=>{
    console.log(error);
});
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const firestoreDB = admin.firestore();

  //firestore route
  //set relay turn on/off
  app.post('/relayStatus', async (req, res) => {
    try {
        const relayStatusObj = await RelayStatus.create(req.body);
        firestoreDB.collection("entities").doc(relayStatusObj.deviceId).set({"relayStatus": true}).then(()=>{
            res.status(200).json({message: "Relay status written into firestore"});
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});
//get relay status
app.get('/relayStatus/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await firestoreDB.collection("entities").doc(id).get().then(doc => {
            if(!doc.data()) {
                res.status(404).send({message: "There is no status for that id!"});
            }
            res.status(200).send(doc.data());
        })
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//routes
app.post('/deviceInfo', async (req, res) => {
    try {
        const device = await Device.create(req.body);
        res.status(200).json({message: "Device info written into Database"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({message: "Product written into Database"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//update product 
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            return res.status(404).json({message: `Product not found by id: ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product) {
            return res.status(404).json({message: `Product not found by id: ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});