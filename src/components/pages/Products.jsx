
// import Navbar from './Navbar'
// import LiquidGlass  from "liquid-glass-react";

// import { useNavigate } from "react-router-dom"
import CardComp from "./CardComp"

const Products = ({ products }) => {
  // const navigate = useNavigate()
  return (
      <div className="grid grid-cols-3 gap-4 p-5">
        {products.map((product) => (
          <CardComp key={product.id} product={product} category="products"/>
        ))}
      </div>
  )
}

export default Products
