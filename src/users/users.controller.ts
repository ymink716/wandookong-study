import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { email, nickname, password } = createUserDto;

    await this.usersService.createUser(email, nickname, password);
  }

  @Get('/:id')
  getUserInfo(@Param('id') userId: number) {
    // TODO: return값 entity에서 변경
    return this.usersService.getUserInfo(userId);
  }
}
