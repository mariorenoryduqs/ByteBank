import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { RoleModule } from '../role/role.module'; // ✅ Importando RoleModule

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]), // Apenas UsuarioEntity, RoleModule já gerencia RoleEntity
    RoleModule, // ✅ Importando RoleModule que já tem RoleEntity
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule { }
