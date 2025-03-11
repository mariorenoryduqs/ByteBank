import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './roleEntity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])], 
    providers: [RoleService],
    controllers: [RoleController],
    exports: [RoleService, TypeOrmModule],
})
export class RoleModule { }
