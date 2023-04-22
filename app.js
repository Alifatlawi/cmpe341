const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Require the path module

const app = express();
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Aliamer@@1996",
  database: "pet"
});

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "pages", "styles", and "scripts" directories
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public/pages')));
app.use(express.static(path.join(__dirname, 'public/styles')));
app.use(express.static(path.join(__dirname, 'public/scripts')));


// // Serve the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'pages', 'index.html'));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/add-appointment', async (req, res) => {
    const { customer_name, phone_number, address, pet_name, pet_gender, pet_age, pet_type, date , customer_id, pet_id} = req.body;
  
    try {
      // Insert customer and pet data into the database and retrieve their IDs
      const customerResult = await pool.query("INSERT INTO customer (customer_name, phone_number, address, customer_id) VALUES ($1, $2, $3, $4) RETURNING customer_id",
       [customer_name, phone_number, address, customer_id]);
      const customerId = customerResult.rows[0].customer_id;
  
      const petResult = await pool.query("INSERT INTO pet (customer_id, pet_name, pet_gender, pet_age, pet_type, pet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pet_id",
       [customer_id, pet_name, pet_gender, pet_age, pet_type, pet_id]);
      const petId = petResult.rows[0].pet_id;
  
      // Insert appointment data into the database
      await pool.query(
        `INSERT INTO appointment (date, customer_id, pet_id) VALUES ($1, $2, $3)`,
        [date, customerId, petId]
      );
        
      await pool.query('COMMIT');
      // Send a success message to the client
      res.status(200).json({ message: "Appointment added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred while adding the appointment" });
    }
  });
  
  app.get('/search-customer/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
      const customerResult = await pool.query('SELECT * FROM customer WHERE customer_id = $1', [customerId]);
      if (customerResult.rowCount === 0) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
      const customerData = customerResult.rows[0];
  
      const petResult = await pool.query('SELECT * FROM pet WHERE customer_id = $1', [customerId]);
      const petData = petResult.rows[0];
  
      const appointmentResult = await pool.query('SELECT * FROM appointment WHERE customer_id = $1', [customerId]);
      const appointmentData = appointmentResult.rows[0];
  
      res.status(200).json({
        customer_name: customerData.customer_name,
        pet_name: petData.pet_name,
        date: appointmentData.date
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while searching for the customer' });
    }
  });
  

  app.put('/update-customer/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const { customer_name, pet_name, date } = req.body;
  
    try {
      await pool.query('BEGIN');
      await pool.query('UPDATE customer SET customer_name = $1 WHERE customer_id = $2', [customer_name, customerId]);
      await pool.query('UPDATE pet SET pet_name = $1 WHERE customer_id = $2', [pet_name, customerId]);
      await pool.query('UPDATE appointment SET date = $1 WHERE customer_id = $2', [date, customerId]);
      await pool.query('COMMIT');
      res.status(200).json({ message: 'Information updated successfully' });
    } catch (error) {
      console.log(error);
      await pool.query('ROLLBACK');
      res.status(500).json({ message: 'An error occurred while updating the information' });
    }
  });
  

  app.delete('/delete-customer/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
  
    try {
      await pool.query('BEGIN');
      await pool.query('DELETE FROM appointment WHERE customer_id = $1', [customerId]);
      await pool.query('DELETE FROM pet WHERE customer_id = $1', [customerId]);
      await pool.query('DELETE FROM customer WHERE customer_id = $1', [customerId]);
      await pool.query('COMMIT');
      res.status(200).json({ message: 'Customer information deleted successfully' });
    } catch (error) {
      console.log(error);
      await pool.query('ROLLBACK');
      res.status(500).json({ message: 'An error occurred while deleting the customer information' });
    }
  });
  