import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import CadastroUsuario from '../pages/Usuario/CadastroUsuario';
import ListaUsuarios from '../pages/Usuario/ListaUsuario';
import CadastroProduto from '../pages/Produto/CadastroProduto';
import ListaProdutos from '../pages/Produto/ListaProduto';
import Autenticacao from '../pages/Autenticacao';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Menu />
        <div>
          <h1>Bem-vindo à nossa Loja React!</h1>
          <p>Gerencie usuários e produtos de forma simples e eficiente.</p>
        </div>
        <Routes>
          <Route path='/' element={<Autenticacao />} />
          <Route path='/usuarios/cadastro' element={<CadastroUsuario />} />
          <Route path='/usuarios' element={<ListaUsuarios />} />
          <Route path='/produtos/cadastro' element={<CadastroProduto />} />
          <Route path='/produtos' element={<ListaProdutos />} />
        </Routes>
      </div>
    </Router>
  );
}
