const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


// Connect to MongoDB (replace with your connection string)
mongoose.connect(process.env.Mongodb_uri);

app.use(bodyParser.json());
app.use(cors({origin:'*'}))

// Define the schema and model
const customerSchema = new mongoose.Schema({
    phoneNumber: String,
    name: String,
    email: String,
    address: String,
    organization: String
});

const Customer = mongoose.model('Customer', customerSchema);

// Endpoint to create customer data
app.post('/api/customers', async (req, res) => {
    try {
        const { phoneNumber, name, email, address, organization } = req.body;
        const newCustomer = new Customer({ phoneNumber, name, email, address, organization });
        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create customer' });
    }
});

// Endpoint to retrieve all customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customers' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
