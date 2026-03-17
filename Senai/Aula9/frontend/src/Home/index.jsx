import { useNavigate } from 'react-router-dom';
import '../Home/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
        <div className='home-logo'></div>
        <h1 className="home-title">Bar Cereja</h1>
        <br />
        <p className="home-subtitle">Bem-vindo ao nosso espaço! Aproveite o melhor gerenciador de drinks.</p>
        
        <div className="home-buttons">
            <button className="home-button" onClick={() => navigate('/Cadastro')}>
            Cadastro
            </button>
            <button className="home-button secondary" onClick={() => navigate('/Produtos')}>
            Exibir Produtos
            </button>
      </div>
    </div>
  );
}