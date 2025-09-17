import React, { useContext, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import TestAppointmentMain from '../components/TestAppointmentMain'
import { AppContext } from '../Context/AppContext'

const TestAppointment = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'testAppointment'}/>
        <TestAppointmentMain/>
      </div>
    
    </div>
  )
}

export default TestAppointment