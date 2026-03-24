import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../LoginUser/LoginUser.css'

function LoginUser(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }
        console.log("Email:", email);
        console.log("Senha:", senha);

        navigate('/');
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-input"
                />

                <button type="submit" className="login-button">
                    Entrar
                </button>
                <div>
                    <span>Doesn't have an account? </span>
                    <span onClick={() => navigate('/CadastroUser')} className="login-createcount">
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