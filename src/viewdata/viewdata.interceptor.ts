import {
  Injectable,
  Inject,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from '../categories/categories.service';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ViewdataInterceptor implements NestInterceptor {
  categoriesService: CategoriesService;
  authService: AuthService;
  constructor(private moduleRef: ModuleRef) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    this.categoriesService = this.moduleRef.get(CategoriesService, {
      strict: false,
    });
    this.authService = await this.moduleRef.get(AuthService, {
      strict: false,
    });

    const request = context.getArgs()[0] as Request;
    const token = request.cookies['access_token'];
    let userInfo;
    if (token) {
      userInfo = this.authService.decode(token);
    }

    return next.handle().pipe(
      map(async (result) => {
        return {
          ...result,
          userInfo,
          menuCategories: await this.categoriesService.getCategories(),
        };
      }),
    );
  }
}
