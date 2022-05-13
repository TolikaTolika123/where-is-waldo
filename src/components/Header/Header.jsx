import React from 'react'
import cl from './Header.module.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import waldoImg from '../../images/waldo.png'

import { firstLetterToUpperCase } from '../../utils'

const Header = React.forwardRef(({ characters, timer, timerWork, setTimer }, ref) => {
  const {pathname} = useLocation();
  
  const stopTimer = () => {
    timerWork.endTimer();
    setTimer(0);
  }
  if (pathname !== '/') {
    return (
      <header ref={ref} className={cl.header}>
        <Link onClick={stopTimer} to='/' className={cl.homeBtn}>Return to home</Link>
        <p className={cl.timer}>{timer}</p>
        <div className={cl.findList}>
          {characters.map(character => {
            if (character.found === false) {
              return (
                <div key={character.id} className={cl.findItem}>
                  <img src={character.img} alt={character.name} />
                  <p>{firstLetterToUpperCase(character.name)}</p>
                </div>
              )
            } else {
              return (
                <div key={character.id} className={`${cl.findItem} ${cl.overlay}`}>
                  <img src={character.img} alt={character.name} />
                  <p>{firstLetterToUpperCase(character.name)}</p>
                </div>
              )
            }
          })}
        </div>
      </header>
    )
  } else {
    return (
      <header ref={ref} className={cl.header}>
        <button className={cl.homeBtn}>Leaderboard</button>
        <h1 className={cl.title}>Where's Waldo</h1>
        <img className={cl.waldoImg} src={waldoImg} alt="Waldo" />
      </header>
    )
  }

  
})

export default Header