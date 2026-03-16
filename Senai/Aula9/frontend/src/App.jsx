import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const fetch = async () => {
    const response = await axios.get('http://localhost:8080/product/bar')
    setProducts(response.data.products)
  }

  useEffect(() => {
    fetch();
  },[])

  return (
    <>
      {
        products.map((products) => {
          return(
            <div key={products._id}>
              <span>{products.name}</span>
              <span>{products.description}</span>
              <span>{products.price}</span>
              <span>{products.stock}</span>
              <span>{products.category}</span>
            </div>
          )})}
    </>
  )
}

export default App
