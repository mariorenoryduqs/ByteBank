import { useState } from 'react';
import FormularioBase from '../../components/FormularioBase';
import { CampoFormulario } from '../../types/formularioBase';
import type { Autenticacao } from '../../types/autenticacao';
import axios from 'axios';

const camposAutenticacao = [
  { nome: 'email', tipo: 'email', label: 'Email', placeholder: 'Email do usuário', required: true },
  { nome: 'senha', tipo: 'password', label: 'Senha', required: true },
];

export default function Autenticacao() {
  const [autenticacao, setAutenticacao] = useState({ email: '', senha: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/autenticacao', autenticacao);
      alert('Usuário Logado!');
      setAutenticacao({ email: '', senha: '' });
    } catch (err) {
      alert('Erro ao Logar');
    }
  };

  return (
    <FormularioBase<Autenticacao>
      campos={camposAutenticacao as CampoFormulario<Autenticacao>[]}
      valores={autenticacao}
      setValores={setAutenticacao}
      onSubmit={handleSubmit}
      tituloBotao="Entrar"
    />
  );
}