import React from 'react'
import CardComp from './CardComp'
// import { useNavigate } from 'react-router-dom'

const Mobiles = ( {mobiles} ) => {

  // const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
        {mobiles.map((product) => (
          <CardComp key={product.id} product={product} category="mobiles"/>
        ))}
      </div>
  )
}

export default Mobiles
