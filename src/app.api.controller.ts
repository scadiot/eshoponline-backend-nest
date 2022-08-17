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
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class AppApiController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profil')
  getProfile(@Request() req) {
    return req.user;
  }
}
