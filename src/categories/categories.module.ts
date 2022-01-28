import { Module } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
