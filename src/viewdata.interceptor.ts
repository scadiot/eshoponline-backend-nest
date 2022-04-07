import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CategoriesRepository } from './categories/categories.repository';

@Injectable()
export class ViewdataInterceptor implements NestInterceptor {
  constructor(private categoriesRepository: CategoriesRepository) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (result, test) => {
        return {
          ...result,
          menuCategories: await this.categoriesRepository.find({
            parentId: null,
          }),
        };
      }),
    );
  }
}
