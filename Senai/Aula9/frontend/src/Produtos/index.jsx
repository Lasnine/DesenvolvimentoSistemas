import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Produtos/produtos.css'

function Produto() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/bar')

      console.log('RESPOSTA API:', response.data)
      setProducts(response.data?.products || response.data || [])

    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      setProducts([])
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/product/bar/${id}`)

      fetchProducts()
      setMessage('Produto deletado com sucesso!')
      setTimeout(() => setMessage(''), 3000)

    } catch (error) {
      console.error('Erro ao deletar:', error)
      setMessage('Erro ao deletar produto')
    }
  }

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Lista de Produtos</h1>

      {message && <p className="message">{message}</p>}

      <button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        Voltar
      </button>

      <div className="products-list">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card">

              <span><strong>{product.name}</strong></span>
              <span>{product.description}</span>
              <span>R$ {product.price}</span>
              <span>{product.category}</span>

              <div className="actions">
                <button onClick={() => navigate(`/editar/${product._id}`)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(product._id)}>
                  Excluir
                </button>
              </div>

            </div>
          ))
        ) : (
          <p style={{ marginTop: '20px' }}>
            Nenhum produto encontrado
          </p>
        )}
      </div>
    </div>
  )
}

export default Produto