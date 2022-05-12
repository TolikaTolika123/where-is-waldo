import { useState, useEffect, useRef } from 'react'

import Header from "./components/Header/Header";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import './styles/App.css'
import { convertSeconds } from './utils';

import beachImg from './images/beach.jpg';
import waldoImg from './images/waldo.png';
import odlawImg from './images/odlaw.png';
import wizardImg from './images/wizard.png';


function App() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [popupStart, setPopupStart] = useState(true)
  const [timer, setTimer] = useState(0)
  const [popupPlayAgain, setPopupPlayAgain] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const headerRef = useRef(null)
  const [characters, setCharacters] = useState([]);
  const [timerID, setTimerID] = useState();

  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight)
  })

  // checking after every move if user found all characters
  useEffect(() => {
    if (characters.length !== 0 && characters.every(character => character.found === true)) {
      setPopupPlayAgain(true)
      timerWork.endTimer();
    }
  }, [characters]);

  // object which allows to start timer and end it
  const timerWork = {
    startTimer(time) {
      setTimerID(setInterval(() => {
        const delta = Date.now() - time;
        setTimer(Math.floor(delta / 1000));
      }, 1000));
    },
    endTimer() {
      clearInterval(timerID);
    }
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

    const startTime = Date.now();
    timerWork.startTimer(startTime)
  }

  // showing and hiding menu with characters on clicks
  const showMenu = e => {
    e.stopPropagation();
    setMenuVisible(true)
    setMousePos({ x: e.pageX, y: e.pageY - headerHeight })
    console.log(mousePos)
  }

  const hideMenu = () => {
    setMenuVisible(false)
  }

  return (
    <div className="App" onClick={hideMenu}>
      <Header timer={convertSeconds(timer)} ref={headerRef} characters={characters} />
      {
        popupStart &&
        <div className="start__popup">
          <div className="start__popup-content">
            <p className='start__popup-text'>Where's Waldo</p>
            <button onClick={startGame} className='start__popup-btn'>Start Game!</button>
          </div>
        </div>
      }
      {
        popupPlayAgain &&
        <div className="start__popup">
          <div className="start__popup-content">
            <p className='start__popup-text'>Congratulations, You won in {convertSeconds(timer)}! Wanna Play again?</p>
            <button onClick={startGameAgain} className='start__popup-btn'>Play Again!</button>
          </div>
        </div>
      }

      <div className="game-field">
        <img src={beachImg} alt="Game Field" onClick={showMenu} className='game-bg' />
        {menuVisible && <DropdownMenu pos={mousePos} characters={characters} setCharacters={setCharacters} />}
      </div>
    </div>
  );
}

export default App;
