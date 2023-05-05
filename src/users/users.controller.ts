import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { email, nickname, password } = createUserDto;

    await this.usersService.createUser(email, nickname, password);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUserInfo(@Request() req) {
    // TODO: return값 entity에서 변경
    return req.user;
  }
}
