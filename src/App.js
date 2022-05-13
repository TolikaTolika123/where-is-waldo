import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from "./components/Header/Header";
import Beach from './pages/Beach';
import Home from './pages/Home';
import './styles/App.css'
import { convertSeconds } from './utils';

function App() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [timer, setTimer] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)
  const [timerID, setTimerID] = useState();
  const [characters, setCharacters] = useState([]);


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
          <Route path="/" element={<Home />} />
          <Route
            path="/beach"
            element={<Beach {...{
              characters,
              setTimer,
              setMenuVisible,
              headerHeight,
              setCharacters,
              menuVisible,
              timer,
              timerWork
            }} />}
          />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
