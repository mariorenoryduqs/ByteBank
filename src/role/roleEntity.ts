import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 50, unique: true, nullable: false })
    nome: string;

    @ManyToMany(() => UsuarioEntity, usuario => usuario.roles)
    usuarios: UsuarioEntity[];
}
