import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CartProductsService } from './cart-products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductDto } from './cart-products.dto';
import { CartProduct } from './cart-products.entity';

@ApiTags('Cart products')
@Controller('api/cart-products')
export class CartProductsApiController {
  constructor(private cartProductsService: CartProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req): Promise<CartProduct[]> {
    return this.cartProductsService.getProducts(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  setCartProduct(
    @Request() req,
    @Body() cartProducts: CartProductDto[],
  ): Promise<CartProduct[]> {
    return this.cartProductsService.setProducts(req.user, cartProducts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearCartProduct(@Request() req): Promise<void> {
    return this.cartProductsService.clear(req.user);
  }
}
