import React from 'react'
import CardComp from './CardComp'
import { useNavigate } from 'react-router-dom'

const Shoes = ({shoes}) => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
        {shoes.map((product) => (
         <CardComp key={product.id} product={product} category="shoes" />
        ))}
      </div>
  )
}

export default Shoes
