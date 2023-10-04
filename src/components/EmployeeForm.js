// src/components/EmployeeForm.js

import React, { useState } from 'react';
import { addEmployee } from '../utils/indexDB';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
    
  const [name, setName] = useState('');
  const [role, setRole] = useState('product_developer'); // Default role
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = { name, role, startDate, endDate };

    await addEmployee(newEmployee);

    navigate('/');


    // Clear the input fields
    setName('');
    setRole('product_developer'); // Reset to default role
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="employee-form">
           <header style={{ backgroundColor: 'blue', padding: '10px', textAlign: 'center' }}>
        <h1>Add Employee</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="product_developer">Product Developer</option>
            <option value="flutter_developer">Flutter Developer</option>
            <option value="qa_tester">QA Tester</option>
            <option value="product_owner">Product Owner</option>
          </select>
        </div>
        <div className="date-fields">
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
