import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart-products')
export class CartProductsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req): string {
    return 'ok ' + req.user.username;
  }
}
