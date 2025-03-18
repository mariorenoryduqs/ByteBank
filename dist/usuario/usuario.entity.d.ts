import { RoleEntity } from 'src/role/roleEntity';
export declare class UsuarioEntity {
    id: string;
    nome: string;
    email: string;
    senha: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    roles: RoleEntity[];
}
