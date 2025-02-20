import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';
import { UsuarioEntity } from '../usuario.entity';
import { CriaUsuarioDTO } from '../dto/CriaUsuario.dto';
import { randomUUID } from 'crypto'; 

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}


  async criar(dadosUsuario: CriaUsuarioDTO): Promise<UsuarioEntity> {
   
    const usuario = new UsuarioEntity();
    
    // Gerando automática do ID
    usuario.id = randomUUID();  
    usuario.nome = dadosUsuario.nome;
    usuario.email = dadosUsuario.email;
    usuario.senha = dadosUsuario.senha;
    
    return this.usuarioRepository.salvar(usuario);
  }
  
  async listar() {
    return this.usuarioRepository.listar();
  }

  async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    if (Object.keys(dadosDeAtualizacao).length === 0) {
      throw new BadRequestException('Dados de atualização não devidamente preenchidos. Valores vazio encontrados.');
    }

    return this.usuarioRepository.atualiza(id, dadosDeAtualizacao);
  }

  async remover(id: string) {
    return this.usuarioRepository.remove(id);
  }
    
}
