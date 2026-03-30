import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import '../LoginUser/LoginUser.css'

function LoginUser(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/usuario/login',
                {email, password});

            console.log("Resposta API:", response.data);
            
            sessionStorage.setItem('token', response.data.token)
            
            Swal.fire({
                title: 'Sucesso!',
                text: 'Login efetuado com sucesso!',
                icon: 'success'
            })  
            return navigate('/');

            

        } 
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Não foi possível registrar o usuário',
                icon: 'error'
            })
        }
        setEmail('')
        setPassword('')
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <br />
            <form onSubmit={handleLogin} className="login-form">
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

                <button type="submit" onClick={() => navigate('/')} className="login-button">
                    Entrar
                </button>
                <div>
                    <span>Doesn't have an account? </span>
                    <span onClick={() => navigate('/cadastroUser')} className="login-createcount">
                        Create an account
                    </span>
                </div>
            </form>
            <br />
            <div className="login-buttons">
                <button 
                    className="login-button" 
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}

export default LoginUser;