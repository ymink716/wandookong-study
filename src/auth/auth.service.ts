import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<any> {
    // TODO: user service에서 해당 유저 찾기, 암호화된 비밀번호 검증 로직 추가

    const payload = { email, sub: 'userId' };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
