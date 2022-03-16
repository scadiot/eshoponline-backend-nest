import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
  })
  email: string;

  @ApiProperty()
  password: string;
}
