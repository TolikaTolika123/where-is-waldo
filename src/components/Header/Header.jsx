import React from 'react'
import cl from './Header.module.css'

import waldoImg from '../../images/waldo.png';
import odlawImg from '../../images/odlaw.png';
import wizardImg from '../../images/wizard.png';

const Header = React.forwardRef((_, ref) => {
  return (
    <header ref={ref} className={cl.header}>
      <button className={cl.homeBtn}>Return to home</button>
      <p className={cl.timer}>00.00.00</p>
      <div className={cl.findList}>
        <div className={cl.findItem}>
          <img src={waldoImg} alt="Waldo" className='findImg'/>
          <p>Waldo</p>
        </div>
        <div className={cl.findItem}>
          <img src={odlawImg} alt="Odlaw" className='findImg'/>
          <p>Odlaw</p>
        </div>
        <div className={cl.findItem}>
          <img src={wizardImg} alt="Wizard" className='findImg'/>
          <p>Wizard</p>
        </div>
      </div>
    </header>
  )
})

export default Header