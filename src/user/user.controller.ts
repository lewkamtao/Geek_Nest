import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

class UserDto {
  @ApiProperty({ description: '用户昵称' })
  nickname: string;
  @ApiProperty({ description: '用户名' })
  username: string;
}

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private configService: ConfigService) {}

  @Get('')
  @ApiOperation({
    summary: '用户信息',
  })
  detail() {
    return this.configService.get('app');
  }

  @Put(':id')
  @ApiOperation({
    summary: '更新用户',
  })
  updatedUser(
    @Body()
    body: UserDto,
  ) {
    return body;
  }
}
