import React, { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/navbar';
import Footer from '../Footer/Footer';



function LayOut() {
  useEffect(
    () => {
      console.log("Mounting");

    }
    , [])
  return (
    <div>
      <NavBar />
      <div className="mx-auto overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default LayOut