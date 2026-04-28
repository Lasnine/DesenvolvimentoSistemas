import './sidebar.css';
import { NavLink } from 'react-router-dom';

import cadastroImg from '../../assets/cadastro.png';
import projetoImg from '../../assets/folder.png';
import homeImg from '../../assets/home.png';
import historicImg from '../../assets/restock.png';

function Sidebar({ handleDelete, projeto }) {
    return (
        <div className="sidebar">
            <h2 className="logo">Meu App</h2>

            <div className="actions">
                <NavLink to="/" className="link">
                    <img src={homeImg} alt="Home" />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/projetos" className="link">
                    <img src={projetoImg} alt="Projetos" />
                    <span>Projetos</span>
                </NavLink>

                <NavLink to="/outro" className="link">
                    <img src={cadastroImg} alt="Adicionar" />
                    <span>Adicionar Projeto</span>
                </NavLink>

                <button onClick={() => handleDelete?.(projeto?._id)} className="link">
                    <img src={historicImg} alt="Histórico" />
                    <span>Histórico</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;