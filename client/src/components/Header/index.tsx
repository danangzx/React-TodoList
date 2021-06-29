import React from 'react'

import LogoSvgComponent from 'assets/svg/logo';

const Header = () => {
  return (
    <>
      <nav className="bg-darkPurple w-full flex justify-center items-center shadow-xl box-border">
        <LogoSvgComponent height="80px" />
      </nav>

      <div className=" mb-4 mt-4 text-xl text-white flex justify-center items-center"> 
        <h1>ToDo List</h1>
      </div> 
    </>
    
    
  )
}

export default Header