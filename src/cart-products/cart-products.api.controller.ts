import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart products')
@Controller('api/cart-products')
export class CartProductsApiController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req): string {
    return 'ok ' + req.user.email;
  }
}
