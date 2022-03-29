import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeEach(async () => {
    process.env.NODE_ENV = 'test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jwtToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'toto@toto.fr', password: 'bim' })
    ).body.access_token;
  });

  it('/products (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(3);
  });

  it('/products (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'velo9',
        slug: 'velo9',
        summary: 'encore un velo',
        description: 'encore un velo 2',
        keywords: ['velo', 'bicyclette'],
      });
    expect(response.statusCode).toBe(201);
  });
});
