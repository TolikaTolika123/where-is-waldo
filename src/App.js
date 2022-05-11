import { useState, useEffect, useRef } from 'react'

import Header from "./components/Header/Header";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import './styles/App.css'

import beachImg from './images/beach.jpg';
import waldoImg from './images/waldo.png';
import odlawImg from './images/odlaw.png';
import wizardImg from './images/wizard.png';


function App() {
//   const characters = process.env.REACT_APP_CHARACTERS.split('_');
  const [menuVisible, setMenuVisible] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const headerRef = useRef(null)

const [characters, setCharacters] = useState([
  { name: 'waldo', found: false, img: waldoImg, id: 1},
  { name: 'odlaw', found: false, img: odlawImg, id: 2},
  { name: 'wizard', found: false, img: wizardImg, id: 3}
]);

  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight)
  })

  const showMenu = e => {
    e.stopPropagation();
    setMenuVisible(true)
    setMousePos({x: e.pageX, y: e.pageY - headerHeight})
    console.log(mousePos)
  }

  const hideMenu = () => {
    setMenuVisible(false)
  }

  return (
    <div className="App" onClick={hideMenu}>
      <Header ref={headerRef} characters={characters}/>
      <div className="game-field">
        <img src={beachImg} alt="Game Field" onClick={showMenu} className='game-bg'/>
        {menuVisible && <DropdownMenu pos={mousePos} characters={characters} setCharacters={setCharacters}/>}
      </div>
    </div>
  );
}

export default App;
