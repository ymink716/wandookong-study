import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user: User = await this.usersService.verifyAndGetUser(email, password);

    const payload = {
      email: user.email,
      nickname: user.nickname,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
