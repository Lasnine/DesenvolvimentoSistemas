import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Cadastro/cadastro.css'

function Cadastro() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  })

  const navigate = useNavigate()
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/bar')
      setProducts(response.data.products)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8080/product/registrar', {
        ...form,
        stock: true
      })
      fetchProducts()
      setForm({
        name: '',
        description: '',
        price: '',
        category: ''
      })
      setMessage('Produto cadastrado com sucesso!')
      setTimeout(() => {
        setMessage('')
      }, 3000)

    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      setMessage('Erro ao cadastrar produto')
    }
  }

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro</h1>
        <br />
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="form">

        <input 
          name="name" 
          placeholder="Nome do drink" 
          value={form.name} 
          onChange={handleChange} 
        />

        <input 
          name="description" 
          placeholder="Descrição" 
          value={form.description} 
          onChange={handleChange} 
        />

        <input 
          name="price" 
          placeholder="Preço" 
          value={form.price} 
          onChange={handleChange} 
        />

        <input 
          name="category" 
          placeholder="Categoria" 
          value={form.category} 
          onChange={handleChange} 
        />

        <button type="submit">Cadastrar</button>
        <button onClick={() => navigate('/')}>Voltar</button>
      </form>
    </div>
  )
}

export default Cadastro