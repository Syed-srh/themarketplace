import React from 'react'
import CardComp from './CardComp'
import { useNavigate } from 'react-router-dom'

const Laptops = ({laptops}) => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
        {laptops.map((product) => (
      <CardComp key={product.id} product={product} category="laptops" />
        ))}
      </div>
  )
}

export default Laptops
