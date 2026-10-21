const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const db = require('./src/config/database');
const authRoutes = require('./src/routes/auth/authroutes');

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use("/api/auth", authRoutes);





app.use("/health", (req, res) => {
    res.send("DineFlow API is healthy");
})

app.use("/", (req, res) => {
    res.send("DineFlow backend is working");
})






app.listen(process.env.PORT, () => {
    console.log(`server is running on port no. ${process.env.PORT}`)
})