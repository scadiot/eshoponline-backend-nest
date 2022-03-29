import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './categories.dto';
import { Category } from '../categories/categories.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  addCategory(newCategory: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(newCategory);
  }
}
