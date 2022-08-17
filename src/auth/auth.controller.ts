import {
  Controller,
  Render,
  Body,
  Post,
  Get,
  Res,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ViewdataInterceptor } from '../viewdata/viewdata.interceptor';

class loginValidationDto {
  email: string;
  password: string;
}

@ApiExcludeController()
@UseInterceptors(ViewdataInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Render('login_validation')
  async login(@Req() request: any) {
    const t = request.cookies['access_token'];
    if (t) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  @Post()
  @UseInterceptors(ViewdataInterceptor)
  @Render('login_validation')
  async loginValidation(
    @Res() response: any,
    @Body() loginValidationDto: loginValidationDto,
  ) {
    const token = await this.authService.validateAndCreateToken(
      loginValidationDto.email,
      loginValidationDto.password,
    );

    if (token) {
      response.cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
