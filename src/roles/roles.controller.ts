import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'All roles.',
    type: [Role],
  })
  getRoles(): Role[] {
    return this.rolesService.getRoles();
  }
}
