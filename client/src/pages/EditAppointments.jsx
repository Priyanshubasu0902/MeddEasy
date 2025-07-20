import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import EditAppointmentMain from '../components/EditAppointmentMain'

const EditAppointments = () => {
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