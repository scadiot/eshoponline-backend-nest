import { Module } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
})
export class CategoriesModule {}
