import { EntityRepository, Repository } from 'typeorm';
import { CartProduct } from './cart-products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Product } from 'src/products/products.entity';

@EntityRepository(CartProduct)
export class CartProductsRepository extends Repository<CartProduct> {
  private logger = new Logger('CartProductsRepository');

  async getCategoriesByProduct(productId: number): Promise<CartProduct[]> {
    const query = this.createQueryBuilder('c')
      .leftJoin('c.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }
}
