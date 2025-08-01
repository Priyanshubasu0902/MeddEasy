import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import AddAppointmentMain from '../components/AddAppointmentMain'
import { AppContext } from '../Context/AppContext'

const AddAppointments = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

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