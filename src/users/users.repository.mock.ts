import { User } from './users.entity';

export class UsersRepositoryMock {
  users: User[] = [
    {
      id: 1,
      email: 'test@gmail.com',
      password: 'password',
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      password: 'password2',
    },
  ];

  async getUserByMail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async find(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }

  async save(user: any) {
    const userInDb = this.users.find((u) => u.id === user.id);
    if (userInDb) {
      user.email = user.email ? user.email : userInDb.email;
      user.password = user.password ? user.password : userInDb.password;
    } else {
      user.id = 10;
      this.users.push(user);
    }
    return user;
  }

  create(user: any): User {
    return user;
  }
}
