import React, {useState, useEffect} from 'react'
import { convertSeconds } from '../../utils'
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'

import cl from './Level.module.css'

const Level = (props) => {
  const [popupStart, setPopupStart] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [popupPlayAgain, setPopupPlayAgain] = useState(false)

  // checking after every move if user found all characters
  useEffect(() => {
    if (props.characters.length !== 0 && props.characters.every(character => character.found === true)) {
      setPopupPlayAgain(true)
      props.timerWork.endTimer();
      window.scrollTo(0, 0)
    }
  }, [props.characters]);
  
  // showing and hiding menu with props.characters on clicks
  const showMenu = e => {
    e.stopPropagation();
    props.setMenuVisible(true)
    setMousePos({ x: e.pageX, y: e.pageY - props.headerHeight })
  }


  // executes when user starts game first time
  const startGame = () => {
    setPopupStart(false);
    props.setCharacters(structuredClone(props.level.characters))
    const startTime = Date.now();
    props.timerWork.startTimer(startTime)
  }

  // executes when user starts game after winning
  const startGameAgain = () => {
    setPopupPlayAgain(false)
    props.setCharacters(structuredClone(props.level.characters))

    const startTime = Date.now();
    props.timerWork.startTimer(startTime)
  }

  useEffect(() => {
    if (popupStart || popupPlayAgain) {
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('body').style.overflow = 'auto'
    }
  }, [popupStart, popupPlayAgain])

  return (
    <div className={cl.gameField}>
      {
      popupStart &&
      <div className={cl.startPopup} style={{top: props.headerHeight}}>
        <div className={cl.startPopupContent}>
          <p className={cl.startPopupText}>Where's Waldo</p>
          <button onClick={startGame} className={cl.startPopupBtn}>Start Game!</button>
        </div>
      </div>
    }
    {
      popupPlayAgain &&
      <div className={cl.startPopup} style={{top: props.headerHeight}}>
        <div className={cl.startPopupContent}>
          <p className={cl.startPopupText}>Congratulations, You won in {convertSeconds(props.timer)}! Wanna Play again?</p>
          <button onClick={startGameAgain} className={cl.startPopupBtn}>Play Again!</button>
        </div>
      </div>
    }
      <img src={props.level.img} alt="Game Field" onClick={showMenu} className={cl.gameBg} />
      {props.menuVisible && <DropdownMenu pos={mousePos} characters={props.characters} setCharacters={props.setCharacters} />}
    </div>
  )
}

export default Level