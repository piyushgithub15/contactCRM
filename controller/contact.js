const express = require('express');
const app = express();
const domain = "https://piyush-586847244877596727.myfreshworks.com/crm/sales/api/contacts/"
const api="_5W6aLzrsvNEKbc2SSnYaw"
const axios =require('axios')
app.use(express.json());

//creating the contact
const createContact= async (req, res) => {
  const { first_name, last_name, email, mobile_number} = req.body;

  if (!first_name || !last_name || !email || !mobile_number) {
    return res.status(400).json({ error: 'Missing required parameters' });   
  }
  const contact ={
    first_name,
    last_name,
    email,
    mobile_number
  }
  
  try {
    const response = await axios.post(domain, { contact }, {
      headers: {
        'Authorization': `Token token=${api}`,
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      console.log('Contact created successfully:', response.data);
      res.send(contact);
    } else {
      console.log('Failed to create contact:', response.data);
      throw new Error('Failed to create contact');
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }

  
  
}

// POST /getContact endpoint
const getContact=async (req, res) => {
  const { contact_id} = req.body;

  // Perform validation
  if (!contact_id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  
  try {
    const response = await axios.get(`${domain}/${contact_id}`, {
      headers: {
        'Authorization': `Token token=${api}`,
      },
    });

    console.log(response.data)

    const responseData = response.data; 

    res.json(responseData.contact);
    console.log('Contact:', responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
}

//POST /updateContact
const updateContact=async (req, res) => {
  const { first_name, last_name, email, mobile_number,contact_id} = req.body;
  
  if (!contact_id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  

  const contact ={
    first_name,
    last_name,
    email,
    mobile_number
  }

  
  

  try {
    const response = await axios.put(`${domain}/${contact_id}`, contact, {
      headers: {
        'Authorization': `Token token=${api}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Contact updated:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error updating contact:', error);
  }
}  


//POST /deleteContact
const deleteContact= async (req, res) => {
  const {contact_id} = req.body;
  
  if (!contact_id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  

  
 

  
  

  try {
    
    const response = await axios.delete(`${domain}/${contact_id}`, {
      headers: {
        'Authorization': `Token token=${api}`,
      },
    });
    res.send(response.data);
    console.log('Contact:', response.data);
  } 
    catch (error) {
    console.error('Error retrieving contacts:');
  }  
}

module.exports = {updateContact,createContact,getContact,deleteContact};













