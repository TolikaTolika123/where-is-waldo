import React from 'react'
import cl from './DropdownMenu.module.css'

import { firstLetterToUpperCase } from '../../utils'

const DropdownMenu = ({ pos, characters, setCharacters }) => {

  // executes when user selects character and checks if guess was right
  const validateMove = character => {
    if (
      pos.x > process.env[`REACT_APP_${character.name.toUpperCase()}_LEFT`]
      && pos.y > process.env[`REACT_APP_${character.name.toUpperCase()}_TOP`]
      && pos.x < process.env[`REACT_APP_${character.name.toUpperCase()}_RIGHT`]
      && pos.y < process.env[`REACT_APP_${character.name.toUpperCase()}_BOTTOM`]
    ) {
      confirmMove(character)
    }
  }

  // executes when user finds someone and sets found value of that character to true
  const confirmMove = character => {
    const changedCharacters = structuredClone(characters);
    changedCharacters.find(char => char.id === character.id).found = true;
    setCharacters(changedCharacters)
  }

  return (
    <div className={cl.menu} style={{ left: pos.x + 15, top: pos.y + 15 }}>
      {characters.map(character => (
        <div key={character.id} onClick={() => validateMove(character)} className={cl.menuItem}>
          <img src={character.img} alt={character.name} />
          <p>{firstLetterToUpperCase(character.name)}</p>
        </div>
      ))}
    </div>
  )
}

export default DropdownMenu