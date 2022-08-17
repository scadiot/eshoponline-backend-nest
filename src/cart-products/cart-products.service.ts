import { Injectable } from '@nestjs/common';
import { CartProductsRepository } from './cart-products.repository';
import { ProductsRepository } from '../products/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './cart-products.entity';
import { CartProductDto } from './cart-products.dto';
import { User } from '../users/users.entity';
import { JwtPayload } from '../auth/jwtPayload';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProductsRepository)
    private CartProductsRepository: CartProductsRepository,
    @InjectRepository(ProductsRepository)
    private ProductsRepository: ProductsRepository,
  ) {}

  async getProducts(user: JwtPayload): Promise<CartProduct[]> {
    return this.CartProductsRepository.getProductsByUser(user.userId);
  }

  async setProducts(
    user: JwtPayload,
    cartProductDtos: CartProductDto[],
  ): Promise<CartProduct[]> {
    const productIds: number[] = cartProductDtos.map((cpd) => cpd.productId);
    const products = await this.ProductsRepository.findByIds(productIds);
    const cartProducts = await this.CartProductsRepository.getProductsByUser(
      user.userId,
    );
    for (const cartProductDto of cartProductDtos) {
      const product = products.find((p) => p.id === cartProductDto.productId);
      if (product === undefined) {
        continue;
      }
      const cartProduct = cartProducts.find(
        (cp) => cp.productId === cartProductDto.productId,
      );
      if (cartProduct !== undefined) {
        if (cartProductDto.count === 0) {
          await this.CartProductsRepository.remove(cartProduct);
        } else {
          cartProduct.count = cartProductDto.count;
          await this.CartProductsRepository.save(cartProduct);
        }
      } else {
        const newCartProduct = this.CartProductsRepository.create({
          count: cartProductDto.count,
          userId: user.userId,
          productId: cartProductDto.productId,
        });
        await this.CartProductsRepository.save(newCartProduct);
      }
    }
    return this.CartProductsRepository.getProductsByUser(user.userId);
  }

  async clear(user: JwtPayload): Promise<void> {
    return this.CartProductsRepository.clearByUser(user.userId);
  }
}
