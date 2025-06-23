import React from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar';
import TestResultMain from '../components/TestResultMain'

const TestResult = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={"testresults"} />
        <TestResultMain/>
      </div>
    </div>
  );
}

export default TestResult