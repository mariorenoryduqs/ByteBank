import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './roleEntity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) { }

    async criarRole(nome: string): Promise<RoleEntity> {
        const novaRole = this.roleRepository.create({ nome });
        return await this.roleRepository.save(novaRole);
    }

    async listarRoles(): Promise<RoleEntity[]> {
        return await this.roleRepository.find();
    }
}
