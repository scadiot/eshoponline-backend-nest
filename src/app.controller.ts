import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiCreatedResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('login')
  loginHttp(@Res() response) {
    // Do username+password check here.
    const userId = 'dummy';

    //const payload = { userId: userId };
    //const token = this.jwtService.sign(payload);

    response
      .cookie('access_token', 'coucou', {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }

  @Get('toto')
  findAll(@Req() request) {
    console.log(request.cookies); // or "request.cookies['cookieKey']"
    // or console.log(request.signedCookies);
  }
}
