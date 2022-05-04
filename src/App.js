import { useState, useEffect, useRef } from 'react'

import Header from "./components/Header/Header";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import './styles/App.css'

import beachImg from './images/beach.jpg'

function App() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const headerRef = useRef(null)

  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight)
  })

  const showMenu = e => {
    e.stopPropagation();
    setMenuVisible(true)
    setMousePos({x: e.pageX, y: e.pageY - headerHeight})
  }

  const hideMenu = () => {
    setMenuVisible(false)
  }

  return (
    <div className="App" onClick={hideMenu}>
      <Header ref={headerRef}/>
      <div className="game-field">
        <img src={beachImg} alt="Game Field" onClick={showMenu} className='game-bg'/>
        {menuVisible && <DropdownMenu pos={mousePos}/>}
      </div>
    </div>
  );
}

export default App;
