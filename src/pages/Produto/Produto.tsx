import React, { useState } from 'react';
import style from './Produto.module.scss';


export default function Produto() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [categoriaProduto, setCategoriaProduto] = useState('');
  const [erro, setErro] = useState<string>('');

  const handleNomeProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeProduto(event.target.value);
  };

  const handlePrecoProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remover tudo o que não for número, ponto ou vírgula
    const value = event.target.value;
    const regex = /[^0-9.,]/g; // Permite apenas números, ponto e vírgula
    const formattedValue = value.replace(regex, '');

    // Substituir vírgula por ponto
    setPrecoProduto(formattedValue.replace(',', '.'));
  };

  const handleQuantidadeProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remover tudo o que não for número, ponto ou vírgula
    const value = event.target.value;
    const regex = /[^0-9.,]/g; // Permite apenas números, ponto e vírgula
    const formattedValue = value.replace(regex, '');

    // Substituir vírgula por ponto
    setQuantidadeProduto(formattedValue.replace(',', '.'));
  };

  const handleDescricaoProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescricaoProduto(event.target.value);
  };

  const handleCategoriaProdutoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriaProduto(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação simples para verificar se os campos estão vazios ou inválidos
    if (!nomeProduto || !precoProduto || !quantidadeProduto || !descricaoProduto || !categoriaProduto) {
      setErro('\Todos os campos devem ser preenchidos.');
      return;
    }

    // Limpar erro se tudo estiver preenchido corretamente
    setErro('');
    console.log('Produto:', nomeProduto);
    console.log('Preço:', precoProduto);
    console.log('Quantidade:', quantidadeProduto);
    console.log('Descrição:', descricaoProduto);
    console.log('Categoria:', categoriaProduto);
  };

  return (
    <div className={style.container}>

      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Produto</h2>
        <div className={style.formField}>
          <label htmlFor="nomeProduto">Nome do Produto</label>
          <input
            type="text"
            id="nomeProduto"
            value={nomeProduto}
            onChange={handleNomeProdutoChange}
            className={style.inputField}
            placeholder="Por favor, informe o nome do produto"
          />
        </div>
        <div className={style.formField}>
          <label htmlFor="precoProduto">Preço do Produto</label>
          <input
            type="text"
            id="precoProduto"
            value={precoProduto}
            onChange={handlePrecoProdutoChange}
            className={style.inputField}
            placeholder="Informe o preço do produto"
          />
        </div>
        <div className={style.formField}>
          <label htmlFor="quantidadeProduto">Quantidade</label>
          <input
            type="text"
            id="quantidadeProduto"
            value={quantidadeProduto}
            onChange={handleQuantidadeProdutoChange}
            className={style.inputField}
            placeholder="Informe a quantidade desejada"
          />
        </div>
        <div className={style.formField}>
          <label htmlFor="descricaoProduto">Descrição</label>
          <input
            type="text"
            id="descricaoProduto"
            value={descricaoProduto}
            onChange={handleDescricaoProdutoChange}
            className={style.inputField}
            placeholder="Informe a descrição do produto"
          />
        </div>
        <div className={style.formField}>
          <label htmlFor="categoriaProduto">Categoria</label>
          <input
            type="text"
            id="categoriaProduto"
            value={categoriaProduto}
            onChange={handleCategoriaProdutoChange}
            className={style.inputField}
            placeholder="Informe a categoria do produto"
          />
        </div>

        {erro && <p className={style.errorMessage}>{erro}</p>}

        <button type="submit" className={style.submitButton}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
