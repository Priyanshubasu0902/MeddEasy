import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import MainAddReading from '../components/MainAddReading'
import { AppContext } from '../Context/AppContext'

const AddReadings = () => {

    const {setView} = useContext(AppContext)
    useEffect(()=>setView(false),[])

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