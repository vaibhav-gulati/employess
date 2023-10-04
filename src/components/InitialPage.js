// src/components/InitialPage.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../utils/indexDB';

function InitialPage() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  useEffect(() => {
    // Load the list of employees from the database
    async function loadEmployees() {
      const employeesList = await getAllEmployees();
      setEmployees(employeesList);
      console.log(employees);
    }

    loadEmployees();
  }, []);

  // Handle navigation to the EmployeeForm component
  const navigateToAddEmployee = () => {
    navigate('/add');
  };

  // Handle employee deletion
  const handleDeleteEmployee = async (employeeId) => {
    // Delete the employee from the database
    await deleteEmployee(employeeId);

    // Update the employee list in state (re-fetch data)
    const updatedEmployeesList = await getAllEmployees();
    setEmployees(updatedEmployeesList);
  };

  // Handle navigation to the EditEmployee component
  const navigateToEditEmployee = (employeeId) => {
    // Navigate to the edit page with the employee ID as a parameter
    navigate(`/edit/${employeeId}`);
  };

  return (
    <div className="initial-page">
      <header style={{ backgroundColor: 'blue', padding: '10px', textAlign: 'center' }}>
        <h1>Employee List</h1>
      </header>

      <div className="employee-list">
        <h2>Employees:</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.position}
              <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              <button onClick={() => navigateToEditEmployee(employee.id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-employee-button" style={{ textAlign: 'center' }}>
        {/* Always display the "Add Employee" button */}
        <button onClick={navigateToAddEmployee}>+</button>
      </div>
    </div>
  );
}

export default InitialPage;
