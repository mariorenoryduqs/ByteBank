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
exports.ProdutoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ListaProduto_dto_1 = require("./dto/ListaProduto.dto");
const produto_entity_1 = require("./produto.entity");
const fornecedor_entity_1 = require("../Fornecedor/fornecedor.entity");
let ProdutoService = class ProdutoService {
    constructor(produtoRepository, fornecedorRepository) {
        this.produtoRepository = produtoRepository;
        this.fornecedorRepository = fornecedorRepository;
    }
    async criaProduto(produtoEntity, fornecedorId) {
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
        return produtosSalvos.map((produto) => new ListaProduto_dto_1.ListaProdutoDTO(produto.id, produto.nome, produto.caracteristicas, produto.imagens));
    }
    async listProdutoPorId(id) {
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
        return new ListaProduto_dto_1.ListaProdutoDTO(produto.id, produto.nome, produto.caracteristicas, produto.imagens);
    }
    async atualizaProduto(id, novosDados) {
        const entityName = await this.produtoRepository.findOneBy({ id });
        if (!entityName) {
            throw new Error('Produto não encontrado');
        }
        Object.assign(entityName, novosDados);
        await this.produtoRepository.save(entityName);
        return entityName;
    }
    async deletaProduto(id) {
        const produto = await this.produtoRepository.findOneBy({ id });
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        await this.produtoRepository.delete(id);
        return produto;
    }
};
ProdutoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.ProdutoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(fornecedor_entity_1.FornecedorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProdutoService);
exports.ProdutoService = ProdutoService;
//# sourceMappingURL=produto.service.js.map