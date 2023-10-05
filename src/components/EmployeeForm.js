
import React, { useState } from 'react';
import { addEmployee } from '../utils/indexDB';
import { useNavigate } from 'react-router-dom';
import '../App.css';

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
    setName('');
    setRole('product_developer'); 
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="employee-form">
       <header style={{ backgroundColor: '#1DA1F2', padding: '10px', textAlign: 'left', color:'white' }}>
        <h1> Add Employee Details</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <input className='namelabel' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="product_developer">Product Developer</option>
            <option value="flutter_developer">Flutter Developer</option>
            <option value="qa_tester">QA Tester</option>
            <option value="product_owner">Product Owner</option>
          </select>
        </div>
        <div className="date-fields">
          <div>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
