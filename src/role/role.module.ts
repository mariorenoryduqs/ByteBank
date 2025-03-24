import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './roleEntity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])], // Registra RoleEntity no TypeORM
    providers: [RoleService],
    controllers: [RoleController],
    exports: [RoleService, TypeOrmModule], // 🔥 Exportando TypeOrmModule para outros módulos
})
export class RoleModule { }
