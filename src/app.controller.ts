import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Render,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiExcludeController, ApiProperty } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get('')
  @Render('index')
  getIndex(@Request() req) {
    return {};
  }

  @Get('signup')
  @Render('signup')
  getSignup(@Request() req) {
    return {};
  }
}
