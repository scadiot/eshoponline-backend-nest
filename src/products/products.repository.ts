import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository');

  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get product`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
