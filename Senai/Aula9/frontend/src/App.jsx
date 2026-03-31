import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/index.jsx';
import Cadastro from './Cadastro/index.jsx';
import Produtos from './Produtos/index.jsx';
import LoginUser from './LoginUser/index.jsx';
import CadastroUser from './CadastroUser/index.jsx';
import Atualizar from './Atualizar/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/Login" element={<LoginUser />} />
        <Route path="/CadastroUser" element={<CadastroUser />} />
        <Route path="/editar/:id" element={<Atualizar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;