import { ConflictException, NotFoundException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, nickname: string, password: string): Promise<void> {
    const existedUser = await this.findUserByEmail(email);

    if (existedUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = await this.createHashedPassword(password);

    const user: User = this.usersRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
  }

  async verifyAndGetUser(email: string, password: string): Promise<User> {
    const user: User = await this.findUserByEmail(email);
    const hash = user.password;

    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new UnauthorizedException('사용자 정보가 일치하지 않습니다.');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    return user;
  }

  private async createHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async getUserInfo(userId: number) {
    const user: User = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
