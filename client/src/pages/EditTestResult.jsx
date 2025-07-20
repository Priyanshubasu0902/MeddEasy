import React from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar';
import EditTestResultMain from '../components/EditTestResultMain';

const TestResult = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={"testresults"} />
        <EditTestResultMain/>
      </div>
    </div>
  );
}

export default TestResult