import React from 'react'
import cl from './Header.module.css'

import { firstLetterToUpperCase } from '../../utils'

const Header = React.forwardRef(({ characters }, ref) => {
  return (
    <header ref={ref} className={cl.header}>
      <button className={cl.homeBtn}>Return to home</button>
      <p className={cl.timer}>00.00.00</p>
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
})

export default Header