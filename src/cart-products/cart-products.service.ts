import { Injectable } from '@nestjs/common';
import { CartProductsRepository } from './cart-products.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProductsRepository)
    private CartProductsRepository: CartProductsRepository,
  ) {}
}
