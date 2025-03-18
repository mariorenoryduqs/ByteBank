import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FornecedorEntity])],
    providers: [],
    exports: [TypeOrmModule], // Isso permite que outros módulos usem o repositório
})
export class FornecedorModule { }


