import React from 'react';
import logo from './logo.svg';
import './App.css';
import Botao from './componentes/Botao/indes';
import FrmCadastroUsuario from './componentes/Formulario/CadastroUsuario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <FrmCadastroUsuario></FrmCadastroUsuario>
      </header>
    </div>
  );
}

export default App;
