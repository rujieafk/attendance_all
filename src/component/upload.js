import React, { useState, useEffect } from 'react';
import '../App.css';

function Upload() {
  // State variables
  const [selectedEvent, setSelectedEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch events from backend when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Function to fetch content for selected event
  const handleDropdownChange = (e) => {
    setSelectedEvent(e.target.value);
    handleShowList()
  };

  const handleShowList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/content/${selectedEvent}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if an event is selected
    if (!selectedEvent) {
      console.log("Please select an event");
      alert("Please select an event");
      return;
    }
    // Handle download functionality here
  };

  return (
    <div className="background"> 
      <div className="box">
        <h2 className="titleNames">Generate report</h2>
        
          <div className='event-holder'>
            {/* Dropdown to select event */}
            <select id='dropdown' onChange={handleDropdownChange} value={selectedEvent} onClick={handleShowList}>
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.eventId} value={event.eventId}>{event.name + " - Day " + event.dayNum}</option>
              ))}
            </select>
          </div>

          <div className='content-view'>
            <div className="table-container">
              {employees.length === 0 ? (
                <p>List is empty</p>
              ) : (
                <table className="employee-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.employeeId}>
                        <td>{employee.employeeId}</td>
                        <td>{employee.name}</td>
                        <td>{employee.attendance ? 'Present' : 'Not present'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>


        <div className='upload-btn'>
          <button hidden className="" onClick={handleSubmit}>Download</button>
        </div>
        
      </div>
    </div>
  );
}

export default Upload;
/* https://youtu.be/e9cC8rTG7MQ */