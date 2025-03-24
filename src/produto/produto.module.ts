import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from './repository/produto.repository';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity]), FornecedorModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
  exports: [ProdutoRepository],
})
export class ProdutoModule {}
