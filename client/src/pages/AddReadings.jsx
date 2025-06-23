import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import MainAddReading from '../components/MainAddReading'

const AddReadings = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
         <Dashboard section="readings"/>
         <MainAddReading/>
      </div>
    </div>
  )
}

export default AddReadings