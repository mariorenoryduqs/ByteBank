import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './EditarCadastro.module.scss';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';

type Usuario = {
  nome: string;
};

function EditarCadastro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/usuarios/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error('Erro na busca do usuário');
          return response.json();
        })
        .then((data) => {
          setUsuario(data);
        })
        .catch((err) => {
          setErro(err.message);
        });
    }
  }, [id]);

  async function handleSubmit(dados: { [key: string]: string }) {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error('Erro na atualização do usuário');

      const data = await response.json();
      setSucesso(data.mensagem || 'Usuário atualizado com sucesso!');
      setErro('');

        
        setTimeout(() => {
        navigate('/lista-usuario');
      }, 2000); 

    } catch (error) {
      console.error('Erro:', error);
      setErro('Falha na atualização do usuário. Tente novamente.');
      setSucesso('');
    }
  }

  const campos = usuario
    ? [
        {
          label: 'Nome',
          tipo: 'text',
          nome: 'nome',
          valor: usuario.nome,
          required: true,
        },
      ]
    : [];

  return (
    <div className={style.cadastro}>
      <h2>Editar Cadastro</h2>

      {sucesso && <p className={style.sucesso}>{sucesso}</p>}
      {erro && <p className={style.erro}>{erro}</p>}

      {usuario ? (
        <FormularioGenerico
          campos={campos}
          onSubmit={handleSubmit}
          tipoFormulario="edicao"
        />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}

export default EditarCadastro;
