import React, { useState } from 'react';
import axios from 'axios';
import FormularioBase from '../../components/FormularioBase';
import { Usuario } from '../../types/usuario';
import { CampoFormulario } from '../../types/formularioBase';

const campos = [
  { nome: 'nome', tipo: 'text', label: 'Nome', placeholder: 'Nome do usuário', required: true },
  { nome: 'email', tipo: 'email', label: 'Email', placeholder: 'Email do usuário', required: true },
  { nome: 'senha', tipo: 'password', label: 'Senha', required: true },
];

export default function CadastroUsuario() {
  const [usuario, setUsuario] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuarios', usuario);
      alert('Usuário cadastrado!');
      setUsuario({ nome: '', email: '', senha: '' });
    } catch (err) {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <FormularioBase<Usuario>
      campos={campos as CampoFormulario<Usuario>[]}
      valores={usuario}
      setValores={setUsuario}
      onSubmit={handleSubmit}
      tituloBotao="Cadastrar Usuário"
    />
  );
}
