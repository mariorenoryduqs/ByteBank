import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { RoleEntity } from 'src/role/roleEntity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

  ) { }


  async atribuirRole(usuarioId: string, roleId: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['roles'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new NotFoundException(`Papel com ID ${roleId} não encontrado.`);
    }

    usuario.roles.push(role);
    await this.usuarioRepository.save(usuario);
  }


  async criaUsuario(usuarioEntity: UsuarioEntity) {
    // 🔍 Verifica se o e-mail já existe antes de criar o usuário
    const usuarioExistente = await this.buscaPorEmail(usuarioEntity.email);
    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já existente.');
    }

    
    try {
      await this.usuarioRepository.save(usuarioEntity);
    } catch (error) {
      if (error.code === '23505') {
        // Código de erro de chave única no PostgreSQL
        throw new ConflictException('E-mail já cadastrado.');
      }
      throw new InternalServerErrorException(
        'Erro ao criar usuário. Tente novamente mais tarde.',
      );
    }
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    return usuariosSalvos.map(usuario => new ListaUsuarioDTO(usuario.id, usuario.nome));
  }

  async buscaPorEmail(email: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException(`Usuário com e-mail ${email} não encontrado.`);
    }

    return usuario;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuarioExistente) {
      throw new BadRequestException(`Usuário com ID ${id} não encontrado.`);
    }

    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    await this.usuarioRepository.delete(id);
  }
}
