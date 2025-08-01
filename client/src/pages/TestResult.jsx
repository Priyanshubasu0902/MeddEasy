import React, { useContext, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar';
import TestResultMain from '../components/TestResultMain'
import { AppContext } from '../Context/AppContext';

const TestResult = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

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