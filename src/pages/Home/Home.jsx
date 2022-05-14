import React from 'react'
import { Link } from 'react-router-dom'
import cl from './Home.module.css'

const Home = ({levels}) => {
  return (
    <div className={cl.home}>
      {levels.map(level => (
        <div className={cl.levelCard} key={level.id}>
          <img src={level.img} alt={level.name} className={cl.levelImg} />
          <div className={cl.levelContent}>
            <h3 className={cl.levelTitle}>{level.name}</h3>
            <Link to={`/levels/${level.id}`} className={cl.openLevel}>Play!</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home