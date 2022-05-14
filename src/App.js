import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import Level from './pages/Level/Level';
import './styles/App.css'
import { convertSeconds } from './utils';

import beachImg from './images/beach.jpg';
import waldoImg from './images/waldo.png';
import odlawImg from './images/odlaw.png';
import wizardImg from './images/wizard.png';

function App() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [timer, setTimer] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)
  const [timerID, setTimerID] = useState();
  const [characters, setCharacters] = useState([]);

  const levels = [
    {
      name: 'beach',
      id: 1,
      img: beachImg,
      characters: [
        { name: 'waldo', found: false, img: waldoImg, id: 1, cords: {xStart: 977, xEnd: 1044, yStart: 625, yEnd: 753} },
        { name: 'odlaw', found: false, img: odlawImg, id: 2, cords: {xStart: 448, xEnd: 479, yStart: 636, yEnd: 767} },
        { name: 'wizard', found: false, img: wizardImg, id: 3, cords: {xStart: 1164, xEnd: 1220, yStart: 627, yEnd: 738} }
      ]
    }
  ]


  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight)
  })

  const hideMenu = () => {
    setMenuVisible(false)
  }

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

  return (
    <div className="App" onClick={hideMenu}>
      <BrowserRouter >
        <Header timer={convertSeconds(timer)} ref={headerRef} characters={characters} timerWork={timerWork} setTimer={setTimer} />
        <Routes>
          <Route path="/" element={<Home levels={levels}/>} />
          {levels.map(level => (
            <Route
            key={level.id}
            path={`/levels/${level.id}`}
            element={<Level {...{
              timer,
              setTimer,
              menuVisible,
              setMenuVisible,
              headerHeight,
              timerWork,
              level,
              characters,
              setCharacters,
            }} />}
          />
          ))}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
