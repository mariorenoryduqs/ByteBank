import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { RoleModule } from '../role/role.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]), 
    RoleModule, // Importei RoleModule
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule { }
