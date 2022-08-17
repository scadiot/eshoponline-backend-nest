import { EntityRepository, Repository } from 'typeorm';
import { CartProduct } from './cart-products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Product } from 'src/products/products.entity';

@EntityRepository(CartProduct)
export class CartProductsRepository extends Repository<CartProduct> {
  private logger = new Logger('CartProductsRepository');

  async getProductsByUser(userId: number): Promise<CartProduct[]> {
    const query = this.createQueryBuilder('cp')
      .leftJoinAndSelect('cp.product', 'product')
      .andWhere('cp.userId = :userId', {
        userId,
      });

    return await query.getMany();
  }

  async clearByUser(userId: number) {
    const cartProducts = await this.createQueryBuilder('cp')
      .andWhere('cp.userId = :userId', {
        userId,
      })
      .getMany();
    this.remove(cartProducts);
  }
}
