import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projeto from './pages/Projeto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projeto />} />
        {/* <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/Login" element={<LoginUser />} />
        <Route path="/CadastroUser" element={<CadastroUser />} />
        <Route path="/editar/:id" element={<Atualizar />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;