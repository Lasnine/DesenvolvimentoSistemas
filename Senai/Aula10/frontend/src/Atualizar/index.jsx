import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import '../Atualizar/atualizar.css'

function Atualizar(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/${id}`)

            const product = response.data.response

            setForm({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                category: product.category || ''
            })

        } 
        catch (error) {
            console.error('Erro ao buscar produto:', error)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.description || !form.price || !form.category) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos!',
                icon: 'warning'
            });
            return;
        }
        const confirm = await Swal.fire({
              title: 'Tem certeza?',
              text: 'Esse produto será atualizado!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sim, atualizar!',
              cancelButtonText: 'Cancelar'
            })
        if (!confirm.isConfirmed) return
        try {
            const response = await axios.put(
                `http://localhost:8080/product/atualizar/${id}`,{...form, stock: true}
            );
            Swal.fire({
                title: 'Sucesso!',
                text: 'Produto atualizado com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
            navigate('/produtos') 

        } 
        catch (error) {
            console.error('Erro ao atualizar:', error);

            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o produto',
                icon: 'error'
            });
        }
    }

    return (
        <div className="atualizar-container">
            <h1 className="atualizar-title">Atualizar Produto</h1>
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

                <button type="submit">Atualizar</button>

                <button type="button" onClick={() => navigate('/produtos')}>
                    Voltar
                </button>
            </form>
        </div>
    )
}

export default Atualizar;