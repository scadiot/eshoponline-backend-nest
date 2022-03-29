import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';
import { UsersRepositoryMock } from './users.repository.mock';
import { RolesRepository } from '../roles/roles.repository';
import { RolesRepositoryMock } from '../roles/roles.repository.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: new UsersRepositoryMock() },
        { provide: RolesRepository, useValue: new RolesRepositoryMock() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('User should be found', async () => {
    expect(await service.findByMail('test@gmail.com')).toBeDefined();
  });

  it('User should not be found', async () => {
    expect(await service.findByMail('test@gmail2.com')).toBeUndefined();
  });

  it('Users listing', async () => {
    expect((await service.getAll()).length).toBe(2);
  });

  it('User creation', async () => {
    expect(
      await service.create({
        email: 'test3@gmail.com',
        password: 'test',
        rolesIds: [1, 20],
      }),
    ).toEqual({
      id: 10,
      email: 'test3@gmail.com',
      password: 'test',
      roles: [
        {
          id: 1,
          description: 'Application administration',
          name: 'Administrator',
          tag: 'admin',
        },
      ],
    });
  });

  it('User update', async () => {
    expect(
      await service.update({
        id: 1,
        email: 'test4@gmail.com',
        rolesIds: [1, 20],
      }),
    ).toEqual({
      id: 1,
      email: 'test4@gmail.com',
      password: 'password',
      roles: [
        {
          id: 1,
          description: 'Application administration',
          name: 'Administrator',
          tag: 'admin',
        },
      ],
    });
  });
});
