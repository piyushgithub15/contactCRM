const express = require('express')
const app = express()
const port =5000
const axios = require("axios")
const dotenv = require('dotenv');
dotenv.config();
const contactRoutes=require('./routes/contactRoutes')


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(express.json());

app.use('/',contactRoutes);

app.listen(port, () =>{
  console.log(`MyApp listening on port ${port}`)
})