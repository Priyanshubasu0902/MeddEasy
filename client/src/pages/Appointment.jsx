import React from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import AppointmentMain from '../components/AppointmentMain'

const Appointment = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'appointment'}/>
        <AppointmentMain/>
      </div>
    
    </div>
  )
}

export default Appointment