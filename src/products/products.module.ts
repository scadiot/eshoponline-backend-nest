import { Module } from '@nestjs/common';
import { ProductsApiController } from './products.api.controller';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { KeywordsRepository } from '../keywords/keywords.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewdataInterceptor } from '../viewdata.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsRepository,
      CategoriesRepository,
      KeywordsRepository,
    ]),
  ],
  controllers: [ProductsApiController, ProductsController],
  providers: [ProductsService, ViewdataInterceptor],
})
export class ProductsModule {}
