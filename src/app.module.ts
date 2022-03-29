import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KeywordsModule } from './keywords/keywords.module';
import { CartProductsModule } from './cart-products/cart-products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'eshoponline_user',
      password: 'password',
      database: 'test',
      entities:
        process.env.NODE_ENV === 'test'
          ? ['src/**/*.entity.ts']
          : ['dist/**/*.js'],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    RolesModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    CartProductsModule,
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
