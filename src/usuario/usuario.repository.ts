import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];
  

  async salvar(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    this.usuarios.push(usuario);
    return usuario;  
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string): Promise<boolean> {
    return this.usuarios.some((usuario) => usuario.email === email);
  }

  private buscaPorId(id: string): UsuarioEntity {
    const usuario = this.usuarios.find((usuarioSalvo) => usuarioSalvo.id === id);

    if (!usuario) {
      throw new NotFoundException(`ID de usuário ${id} não encontrado.`);
    }

    return usuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    if (Object.keys(dadosDeAtualizacao).length === 0) {
      throw new BadRequestException('Favor preencher os dados de atualização.');
    }

    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave !== 'id') {
        usuario[chave] = valor;
      }
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter((usuarioSalvo) => usuarioSalvo.id !== id);

    return {
      message: `ID de usuário ${id} removido com sucesso.`,
      usuario
    };
  }
    
}
