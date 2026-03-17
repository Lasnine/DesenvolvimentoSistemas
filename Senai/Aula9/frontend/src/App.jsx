import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/index.jsx';
import Cadastro from './Cadastro/index.jsx';
import Produtos from './Produtos/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Produtos" element={<Produtos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;