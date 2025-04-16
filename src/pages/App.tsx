import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro/Cadastro'; 
import Produto from '../pages/Produto/Produto'; 
import ListaUsuario from './Cadastro/ListaUsuario'; 
import Menu from '../components/Menu'; 
import style from './App.module.scss'; 
import EditarCadastro from './Cadastro/EditarCadastro';

function App() {
  return (
    <Router>
      <div className={style.AppContainer}>
        {/* Usando o componente Menu */}
        <Menu />

        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/lista-usuario" element={<ListaUsuario />} />
          <Route path="/" element={<h1>Bem-vindo ao Meu Aplicativo</h1>} />
          <Route path="/editar/:id" element={<EditarCadastro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
