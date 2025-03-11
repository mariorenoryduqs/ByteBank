import { Controller, Post, Get, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    async criarRole(@Body('nome') nome: string) {
        const role = await this.roleService.criarRole(nome);
        return { role, mensagem: 'Perfil criado com sucesso.' };
    }

    @Get()
    async listarRoles() {
        return await this.roleService.listarRoles();
    }
}
