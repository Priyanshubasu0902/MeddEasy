import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import EditTestAppointmentMain from '../components/EditTestAppointmentMain'
import { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'

const EditTestAppointments = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'testAppointment'}/>
        <EditTestAppointmentMain/>
      </div>
    </div>
  )
}

export default EditTestAppointments