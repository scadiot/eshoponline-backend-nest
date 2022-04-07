import { Module } from '@nestjs/common';
import { CartProductsApiController } from './cart-products.api.controller';
import { CartProductsService } from './cart-products.service';
import { CartProductsRepository } from './cart-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductsRepository])],
  controllers: [CartProductsApiController],
  providers: [CartProductsService],
})
export class CartProductsModule {}
