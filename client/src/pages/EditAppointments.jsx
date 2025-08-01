import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import EditAppointmentMain from '../components/EditAppointmentMain'
import { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'

const EditAppointments = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={'appointment'}/>
        <EditAppointmentMain/>
      </div>
    </div>
  )
}

export default EditAppointments