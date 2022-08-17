import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartProductDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  count: number;
}
