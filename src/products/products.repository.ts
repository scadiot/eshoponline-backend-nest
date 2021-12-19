import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository');

  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(`Failed to get product`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const query = this.createQueryBuilder('product');
    query.where("product.slug = :slug", { slug });
    //query.leftJoinAndSelect('product.categories', 'categories')

    try {
      const product = await query.getOne();
      return product;
    } catch (error) {
      this.logger.error(`Failed to get product`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
