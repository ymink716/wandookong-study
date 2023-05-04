import { Controller, Post, Body } from '@nestjs/common';
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
}
