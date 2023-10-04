// src/components/EditEmployee.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../utils/indexDB';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState('');
  const [role, setRole] = useState('product_developer'); // Default role
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function loadEmployee() {
      const employeeData = await getEmployeeById(id);
      setEmployee(employeeData);
      setName(employeeData.name);
      setRole(employeeData.role);
      setStartDate(employeeData.startDate);
      setEndDate(employeeData.endDate);
    }

    loadEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the retrieved employee data with changes
    const updatedEmployee = { ...employee, name, role, startDate, endDate ,id: parseInt(id)};

    // Save the updated employee data to the database
    await updateEmployee(updatedEmployee);

    // Redirect back to the employee list after editing
    navigate('/');

    // Optionally, you can clear the input fields here
    setName('');
    setRole('product_developer'); // Reset to default role
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="employee-form">
      <h2>Edit Employee Details</h2>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditEmployee;
