import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import '../CadastroUser/CadastroUser.css'

function CadastroUser(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/usuario/register',
                {name, email, password});
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário registrado com sucesso!',
                    icon: 'sucess'
                })

            console.log("Resposta API:", response.data);
            alert("Cadastro realizado com sucesso!");
            navigate('/Login');

        } 
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Não foi possível registrar o usuário',
                icon: 'error'
            })
        }
        setName('')
        setEmail('')
        setPassword('')
    };

    return (
        <div className="cadastro-container">
            <h1 className="cadastro-title">Cadastro</h1>
            <br />

            <form onSubmit={handleCadastro} className="cadastro-form">

                <input 
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />

                <input 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />

                <button type="submit" className="cadastro-button">
                    Salvar
                </button>

                <div>
                    <span>Does have an account? </span>
                    <span 
                        onClick={() => navigate('/Login')} 
                        className="cadastro-link"
                    >
                        Login
                    </span>
                </div>

            </form>

            <br />

            <div className="cadastro-buttons">
                <button 
                    className="cadastro-button secondary" 
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}

export default CadastroUser;