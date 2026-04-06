import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Produtos/produtos.css'

function Produto() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/')
      console.log("API RESPONSE:", response.data)
      setProducts(response.data.response || [])
    } 
    catch (error) {
      console.error('Erro ao buscar produtos:', error)
      setProducts([])
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esse produto será deletado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return
    try {
      await axios.delete(`http://localhost:8080/product/delete/${id}`)
      Swal.fire({
        title: 'Deletado!',
        text: 'Produto removido com sucesso!',
        icon: 'success'
      })
      fetchProducts()
    } 
    catch (error) {
      console.error('Erro ao deletar:', error)
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao deletar produto',
        icon: 'error'
      })
    }
  }

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Lista de Produtos</h1>
              
      <div className="products-list">
        {products.length > 0 ? (
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
      <button className="back-button" onClick={() => navigate('/')}>
        Voltar
      </button>
    </div>
  )
}

export default Produto