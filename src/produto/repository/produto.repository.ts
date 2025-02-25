import { Repository } from 'typeorm';
import { ProdutoEntity } from '../produto.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ProdutoRepository extends Repository<ProdutoEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(ProdutoEntity, dataSource.createEntityManager());
    }

    async findByCategoria(categoria: string): Promise<ProdutoEntity[]> {
        return this.find({ where: { categoria } });
    }
}
