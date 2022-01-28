import { Module } from '@nestjs/common';
import { CartProductsController } from './cart-products.controller';
import { CartProductsService } from './cart-products.service';
import { CartProductsRepository } from './cart-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductsRepository])],
  controllers: [CartProductsController],
  providers: [CartProductsService],
})
export class CartProductsModule {}
