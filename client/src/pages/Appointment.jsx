import React, { useContext, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import AppointmentMain from '../components/AppointmentMain'
import { AppContext } from '../Context/AppContext'

const Appointment = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

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