import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CartProductsModule } from './cart-products/cart-products.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dopascript_user',
      password: 'tototo',
      database: 'dopascript',
      entities: ['dist/**/*.js'],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UsersModule,
    CartProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
