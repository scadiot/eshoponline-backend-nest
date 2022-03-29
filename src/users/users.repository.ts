import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserByMail(email: string): Promise<User> {
    return await this.findOne({ where: { email }, relations: ['roles'] });
  }
}
