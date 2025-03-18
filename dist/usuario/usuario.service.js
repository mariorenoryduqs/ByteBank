"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ListaUsuario_dto_1 = require("./dto/ListaUsuario.dto");
const usuario_entity_1 = require("./usuario.entity");
const roleEntity_1 = require("../role/roleEntity");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepository, roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
    }
    async atribuirRole(usuarioId, roleId) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ['roles'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) {
            throw new common_1.NotFoundException(`Papel com ID ${roleId} não encontrado.`);
        }
        usuario.roles.push(role);
        await this.usuarioRepository.save(usuario);
    }
    async criaUsuario(usuarioEntity) {
        const usuarioExistente = await this.buscaPorEmail(usuarioEntity.email);
        if (usuarioExistente) {
            throw new common_1.ConflictException('Este e-mail já está em uso.');
        }
        try {
            await this.usuarioRepository.save(usuarioEntity);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('E-mail já cadastrado.');
            }
            throw new common_1.InternalServerErrorException('Erro ao criar usuário. Tente novamente mais tarde.');
        }
    }
    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        return usuariosSalvos.map(usuario => new ListaUsuario_dto_1.ListaUsuarioDTO(usuario.id, usuario.nome));
    }
    async buscaPorEmail(email) {
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com e-mail ${email} não encontrado.`);
        }
        return usuario;
    }
    async atualizaUsuario(id, novosDados) {
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioExistente) {
            throw new common_1.BadRequestException(`Usuário com ID ${id} não encontrado.`);
        }
        await this.usuarioRepository.update(id, novosDados);
    }
    async deletaUsuario(id) {
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioExistente) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        await this.usuarioRepository.delete(id);
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(roleEntity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map