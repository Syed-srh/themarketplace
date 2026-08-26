import React from 'react'
import CartPayment1 from './CartPayment1'
import CartPayment2 from './CartPayment2'

const CartPayment = (props) => {
  return (
    <div className='flex'>
      <CartPayment1{...props}/>
      <CartPayment2{...props}/>
    </div>
  )
}

export default CartPayment
