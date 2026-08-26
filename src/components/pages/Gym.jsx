import React from 'react'
import CardComp from './CardComp'
import { useNavigate } from 'react-router-dom'

const Gym = ({ gym }) => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {gym.map((product) => (
        <CardComp key={product.id} product={product} category="gym"/>
      ))}
    </div>
  )
}

export default Gym
