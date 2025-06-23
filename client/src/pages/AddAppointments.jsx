import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import AddAppointmentMain from '../components/AddAppointmentMain'

const AddAppointments = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'appointment'}/>
        <AddAppointmentMain/>
      </div>
    </div>
  )
}

export default AddAppointments