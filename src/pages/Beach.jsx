import React, { useState, useEffect } from 'react'
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import { convertSeconds } from '../utils';

import beachImg from '../images/beach.jpg';
import waldoImg from '../images/waldo.png';
import odlawImg from '../images/odlaw.png';
import wizardImg from '../images/wizard.png';

const Beach = ({characters, setMenuVisible, headerHeight, setCharacters, menuVisible, timer, timerWork}) => {
  const [popupStart, setPopupStart] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [popupPlayAgain, setPopupPlayAgain] = useState(false)

  // checking after every move if user found all characters
  useEffect(() => {
    if (characters.length !== 0 && characters.every(character => character.found === true)) {
      setPopupPlayAgain(true)
      timerWork.endTimer();
    }
  }, [characters]);
  
  // showing and hiding menu with characters on clicks
  const showMenu = e => {
    e.stopPropagation();
    setMenuVisible(true)
    setMousePos({ x: e.pageX, y: e.pageY - headerHeight })
  }


  // executes when user starts game first time
  const startGame = () => {
    setPopupStart(false);
    setCharacters([
      { name: 'waldo', found: false, img: waldoImg, id: 1 },
      { name: 'odlaw', found: false, img: odlawImg, id: 2 },
      { name: 'wizard', found: false, img: wizardImg, id: 3 }
    ])
    const startTime = Date.now();
    timerWork.startTimer(startTime)
  }

  // executes when user starts game after winning
  const startGameAgain = () => {
    setPopupPlayAgain(false)
    setCharacters([
      { name: 'waldo', found: false, img: waldoImg, id: 1 },
      { name: 'odlaw', found: false, img: odlawImg, id: 2 },
      { name: 'wizard', found: false, img: wizardImg, id: 3 }
    ])
    console.log(timer)

    const startTime = Date.now();
    timerWork.startTimer(startTime)
  }

  useEffect(() => {
    if (popupStart) {
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('body').style.overflow = 'auto'
    }
  }, [popupStart])
  

  return (
    <div className="game-field">
      {
      popupStart &&
      <div className="start__popup" style={{top: headerHeight}}>
        <div className="start__popup-content">
          <p className='start__popup-text'>Where's Waldo</p>
          <button onClick={startGame} className='start__popup-btn'>Start Game!</button>
        </div>
      </div>
    }
    {
      popupPlayAgain &&
      <div className="start__popup again" style={{top: headerHeight}}>
        <div className="start__popup-content">
          <p className='start__popup-text'>Congratulations, You won in {convertSeconds(timer)}! Wanna Play again?</p>
          <button onClick={startGameAgain} className='start__popup-btn'>Play Again!</button>
        </div>
      </div>
    }
      <img src={beachImg} alt="Game Field" onClick={showMenu} className='game-bg' />
      {menuVisible && <DropdownMenu pos={mousePos} characters={characters} setCharacters={setCharacters} />}
    </div>
  )
}

export default Beach