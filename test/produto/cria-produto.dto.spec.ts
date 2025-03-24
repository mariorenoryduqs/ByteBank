import { validate } from 'class-validator';
import { CriaProdutoDTO, CaracteristicaProdutoDTO, ImagemProdutoDTO } from '../../src/produto/dto/CriaProduto.dto'; //from '/../src/produto/dto/CriaProduto.dto';
import { v4 as uuidv4 } from 'uuid';

describe('CriaProdutoDTO', () => {
    it('Deve ser válido com todos os campos corretos', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.nome = 'Produto Teste';
        dto.valor = 99.99;
        dto.quantidade = 10;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [{ id: uuidv4(), nome: 'Cor', descricao: 'Preto', produto: null }];
        dto.imagens = [{ id: uuidv4(), url: 'https://imagem.com/produto.jpg', descricao: 'Imagem principal', produto: null }];

        const erros = await validate(dto);
        expect(erros.length).toBe(0);
    });

    it('Deve ser inválido sem nome', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.valor = 99.99;
        dto.quantidade = 10;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [{ id: uuidv4(), nome: 'Cor', descricao: 'Preto', produto: null }];
        dto.imagens = [{ id: uuidv4(), url: 'https://imagem.com/produto.jpg', descricao: 'Imagem principal', produto: null }];

        const erros = await validate(dto);
        expect(erros.length).toBeGreaterThan(0);
    });

    it('Deve ser inválido com valores negativos', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.nome = 'Produto Teste';
        dto.valor = -10;
        dto.quantidade = 10;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [{ id: uuidv4(), nome: 'Cor', descricao: 'Preto', produto: null }];
        dto.imagens = [{ id: uuidv4(), url: 'https://imagem.com/produto.jpg', descricao: 'Imagem principal', produto: null }];

        const erros = await validate(dto);
        expect(erros.length).toBeGreaterThan(0);
    });

    it('Deve ser inválido com quantidade negativa', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.nome = 'Produto Teste';
        dto.valor = 99.99;
        dto.quantidade = -5;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [{ id: uuidv4(), nome: 'Cor', descricao: 'Preto', produto: null }];
        dto.imagens = [{ id: uuidv4(), url: 'https://imagem.com/produto.jpg', descricao: 'Imagem principal', produto: null }];

        const erros = await validate(dto);
        expect(erros.length).toBeGreaterThan(0);
    });

    it('Deve ser inválido sem características', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.nome = 'Produto Teste';
        dto.valor = 99.99;
        dto.quantidade = 10;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [];
        dto.imagens = [{ id: uuidv4(), url: 'https://imagem.com/produto.jpg', descricao: 'Imagem principal', produto: null }];

        const erros = await validate(dto);
        expect(erros.length).toBeGreaterThan(0);
    });

    it('Deve ser inválido se não tiverem imagens', async () => {
        const dto = new CriaProdutoDTO();
        dto.usuarioId = uuidv4();
        dto.fornecedorId = uuidv4();
        dto.nome = 'Produto Teste';
        dto.valor = 99.99;
        dto.quantidade = 10;
        dto.descricao = 'Descrição do produto';
        dto.categoria = 'Eletrônicos';
        dto.caracteristicas = [{ id: uuidv4(), nome: 'Cor', descricao: 'Preto', produto: null }];
        dto.imagens = [];

        const erros = await validate(dto);
        expect(erros.length).toBeGreaterThan(0);
    });
});
