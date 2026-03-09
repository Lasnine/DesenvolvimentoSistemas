import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState<any>([])
  const fetchDate = async () => {
    const data = await axios.get("http://localhost:8080/api/product/find")
    setProducts(data)
  }
  useEffect(() => {
    fetchDate();
  }, [])

  return (
    <>

    </>
  )
}

export default App
