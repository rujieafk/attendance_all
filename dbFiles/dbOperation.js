const config = require('./dbConfig');
const sql = require('mssql');
const Employee = require('./employee');

// Function to get all employees
const getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Employee");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get all events
const getEvents = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Event");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get employees by event ID
const getEmployeesByEventId = async (eventId) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('eventId', sql.Int, eventId)
            .query("SELECT * FROM Employee WHERE eventId = @eventId");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getEmployees,
    getEvents,
    getEmployeesByEventId
};
