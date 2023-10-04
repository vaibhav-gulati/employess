// App.js

import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import InitialPage from './components/InitialPage';
import EmployeeForm from './components/EmployeeForm';
import EditEmployee from './components/EditEmployee'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/add" element={<EmployeeForm />} />
      <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/" element={<InitialPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
