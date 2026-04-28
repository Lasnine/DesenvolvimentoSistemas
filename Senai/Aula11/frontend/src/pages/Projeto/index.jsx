import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './projeto.css'
import Sidebar from '../../components/Sidebar'

function Projeto() {
    const [projeto, setProjeto] = useState([])
    const navigate = useNavigate()
    const fetchProjeto = async () => {
        try {
            const response = await axios.get('http://localhost:8080/project/')
            console.log("API RESPONSE:", response.data)
            setProjeto(response.data.response || [])
        } 
        catch (error) {
            console.error('Erro ao buscar o projeto:', error)
            setProjeto([])
        }
    }

    useEffect(() => {
        fetchProjeto()
    }, [])

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Esse projeto será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })
        if (!confirm.isConfirmed) return
        try {
            await axios.delete(`http://localhost:8080/project/delete/${id}`)
            Swal.fire({
                title: 'Deletado!',
                text: 'Projeto removido com sucesso!',
                icon: 'success'
            })
            fetchProducts()
        } 
        catch (error) {
            console.error('Erro ao deletar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar projeto',
                icon: 'error'
        })
        }
    }

  return (
    <div className="projeto-container">
      <Sidebar/>
      <h1 className="projeto-title">Project Quest</h1>
              
      {/* <div className="projeto-list">
        {projetos.length > 0 ? (
          projetos.map((projeto) => (
            <div key={projeto._id} className="card">

              <span><strong>{projeto.name}</strong></span>
              <span>{projeto.xp}</span>
              <span>{projeto.level}</span>
              <span>{projeto.progress}%</span>
              <span>{projeto.status}</span>

              <div className="actions">
                <button onClick={() => navigate(`/editar/${projeto._id}`)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(projeto._id)}>
                  Excluir
                </button>
              </div>

            </div>
          ))
        ) : (
          <p style={{ marginTop: '20px' }}>
            Nenhum projeto encontrado
          </p>
        )}
      </div> */}
    </div>
  )
}

export default Projeto