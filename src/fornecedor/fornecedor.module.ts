import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FornecedorEntity])],
    providers: [],
    exports: [TypeOrmModule], // o repositório poderá ser usado em outros módulos
})
export class FornecedorModule { }


