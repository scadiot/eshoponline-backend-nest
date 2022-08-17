import { Module, forwardRef } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesApiController } from './categories.api.controller';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ProductsRepository } from '../products/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository, ProductsRepository]),
  ],
  controllers: [CategoriesApiController, CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
