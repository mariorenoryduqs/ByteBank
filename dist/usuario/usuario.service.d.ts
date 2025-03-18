import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { RoleEntity } from 'src/role/roleEntity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    private readonly roleRepository;
    constructor(usuarioRepository: Repository<UsuarioEntity>, roleRepository: Repository<RoleEntity>);
    atribuirRole(usuarioId: string, roleId: string): Promise<void>;
    criaUsuario(usuarioEntity: UsuarioEntity): Promise<void>;
    listUsuarios(): Promise<ListaUsuarioDTO[]>;
    buscaPorEmail(email: string): Promise<UsuarioEntity>;
    atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO): Promise<void>;
    deletaUsuario(id: string): Promise<void>;
}
