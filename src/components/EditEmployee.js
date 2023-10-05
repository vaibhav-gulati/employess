
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../utils/indexDB';
import '../App.css';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState('');
  const [role, setRole] = useState('product_developer'); 
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
    const updatedEmployee = { ...employee, name, role, startDate, endDate ,id: parseInt(id)};
    await updateEmployee(updatedEmployee);
    navigate('/');
    setName('');
    setRole('product_developer');
    setStartDate('');
    setEndDate('');
  };

  function handleCancel(){
    navigate('/');
  }

  return (
<div className="">
       <header style={{ backgroundColor: '#1DA1F2', padding: '10px', textAlign: 'left', color:'white' }}>
        <h1> Edit Employee Details</h1>
      </header>
      <div className='form-container'>
      <form onSubmit={handleSubmit} className="employee-form">
  <div className="form-group">
    <input
    placeholder='Employee Name'
      id="name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <select
    placeholder='Select Role'
      id="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}>
    
      <option value="product_developer">Product Developer</option>
      <option value="flutter_developer">Flutter Developer</option>
      <option value="qa_tester">QA Tester</option>
      <option value="product_owner">Product Owner</option>
    </select>
  </div>

  <div className="date-fields">
    <div className="date-input">
      <input
        id="startDate"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
    </div>

    <div className="date-input">
      <input
        id="endDate"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
    </div>
  </div>
  <div className="button-container">
    <button type="button" className="cancel-button" onClick={handleCancel}>
      Cancel
    </button>
    <button type="submit" className="submit-button">
      Submit
    </button>
  </div>
</form>
</div>

    </div>


  );
}

export default EditEmployee;
