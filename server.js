const dbOperation = require('./dbFiles/dbOperation');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // You can change the port as needed

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/events', async (req, res) => {
  try {
    const events = await dbOperation.getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error fetching events");
  }
});

app.get('/content/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const employees = await dbOperation.getEmployeesByEventId(eventId);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Error fetching employees");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
