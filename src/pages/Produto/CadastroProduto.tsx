import React, { useState } from 'react';
import axios from 'axios';
import FormularioBase from '../../components/FormularioBase';
import { Produto } from '../../types/produto';
import { CampoFormulario } from '../../types/formularioBase';

const camposProduto = [
  { nome: 'nome', tipo: 'text', label: 'Nome do Produto', required: true },
  { nome: 'valor', tipo: 'number', label: 'Preço (R$)', required: true },
  { nome: 'quantidade', tipo: 'number', label: 'Quantidade', required: true },
  { nome: 'descricao', tipo: 'text', label: 'Descrição' },
  { nome: 'categoria', tipo: 'text', label: 'Categoria', required: true },
];

export default function CadastroProduto() {
  const [produto, setProduto] = useState<Produto>({ nome: '',valor: 0, quantidade: 0, descricao: '',categoria: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', produto);
      alert('Produto cadastrado!');
      setProduto({ nome: '',valor: 0, quantidade: 0, descricao: '', categoria: '' });
    } catch (err) {
      alert('Erro ao cadastrar produto');
    }
  };

  return (
    <FormularioBase<Produto>
      campos={camposProduto as CampoFormulario<Produto>[]}
      valores={produto}
      setValores={setProduto}
      onSubmit={handleSubmit}
      tituloBotao="Cadastrar Produto"
    />
  );
}
