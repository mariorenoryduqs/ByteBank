import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'

describe('ProdutoController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('GET /produtos - Deve retornar lista de produtos', async () => {
        const response = await request(app.getHttpServer()).get('/produtos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /produtos - Deve criar um novo produto', async () => {
        const novoProduto = {
            nome: 'ProdutoTeste',
            usuarioId: '1234',
            valor: 99.99,
            quantidade: 10,
            descricao: 'Um produto de teste',
            categoria: 'Eletrônicos',
            caracteristicas: [],
            imagens: [],
            fornecedorId: '1'
        };

        const response = await request(app.getHttpServer())
            .post('/produtos')
            .send(novoProduto);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(novoProduto.nome);
    });
});
