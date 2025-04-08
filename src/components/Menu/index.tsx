import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/usuarios/cadastro'>Cadastrar Usuário</Link>
        </li>
        <li>
          <Link to='/usuarios'>Lista de Usuarios</Link>
        </li>
        <li>
          <Link to='/produtos/cadastro'>Cadastrar Produto</Link>
        </li>
        <li>
          <Link to='/produtos'>Lista de Produtos</Link>
        </li>
      </ul>
    </nav>
  );
}
