import React from 'react'
import cl from './DropdownMenu.module.css'

import waldoImg from '../../images/waldo.png';
import odlawImg from '../../images/odlaw.png';
import wizardImg from '../../images/wizard.png';

const DropdownMenu = ({ pos }) => {
  return (
    <div className={cl.menu} style={{left: pos.x + 15, top: pos.y + 15}}>
      <div className={cl.menuItem}>
        <img src={waldoImg} alt="Waldo" className='findImg' />
        <p>Waldo</p>
      </div>
      <div className={cl.menuItem}>
        <img src={odlawImg} alt="Odlaw" className='findImg' />
        <p>Odlaw</p>
      </div>
      <div className={cl.menuItem}>
        <img src={wizardImg} alt="Wizard" className='findImg' />
        <p>Wizard</p>
      </div>
    </div>
  )
}

export default DropdownMenu