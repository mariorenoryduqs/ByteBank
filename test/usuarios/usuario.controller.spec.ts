import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UsuarioController (e2e)', () => {
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

    it('GET /usuarios - Deve retornar a lista dos usuários', async () => {
        const response = await request(app.getHttpServer()).get('/usuarios');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /usuarios - Deve criar novo usuário', async () => {
        const novoUsuario = {
            nome: 'Teste de usuarios',
            email: 'teste@curso.com',
            senha: '123456789'
        };

        const response = await request(app.getHttpServer())
            .post('/usuarios')
            .send(novoUsuario);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('usuario');
        expect(response.body.usuario).toHaveProperty('id');
        expect(response.body.usuario.nome).toBe(novoUsuario.nome);
    });
});
