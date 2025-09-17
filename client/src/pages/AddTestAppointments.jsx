import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import { AppContext } from '../Context/AppContext'
import AddTestAppointmentMain from '../components/AddTestAppointmentMain'

const AddTestAppointments = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'testAppointment'}/>
        <AddTestAppointmentMain/>
      </div>
    </div>
  )
}

export default AddTestAppointments