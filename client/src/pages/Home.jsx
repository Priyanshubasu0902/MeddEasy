import React from 'react'
import Dashboard from '../components/Dashboard'
import HomeMain from '../components/HomeMain'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section='home'/>
        <HomeMain/>
      </div>
    </div>
  )
}

export default Home