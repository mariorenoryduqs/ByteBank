import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { FornecedorEntity } from 'src/Fornecedor/fornecedor.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,

    @InjectRepository(FornecedorEntity)
    private readonly fornecedorRepository: Repository<FornecedorEntity>,
  ) { }

  async criaProduto(produtoEntity: ProdutoEntity, fornecedorId: string) {
    const fornecedor = await this.fornecedorRepository.findOneBy({ id: fornecedorId });

    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado');
    }

    produtoEntity.fornecedor = fornecedor;

    return this.produtoRepository.save(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    return produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
  }

  async listProdutoPorId(id: string) {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return new ListaProdutoDTO(
      produto.id,
      produto.nome,
      produto.caracteristicas,
      produto.imagens,
    );
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (!entityName) {
      throw new Error('Produto não encontrado');
    }

    Object.assign(entityName, novosDados);
    await this.produtoRepository.save(entityName);
    return entityName;
  }

  async deletaProduto(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    await this.produtoRepository.delete(id);
    return produto;
  }
}
