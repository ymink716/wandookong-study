import { ConflictException, Injectable } from '@nestjs/common';
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

  async createUser(
    email: string,
    nickname: string,
    password: string,
  ): Promise<void> {
    const existedUser = await this.findUser(email);

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

  async findUser(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ email });

    return user;
  }

  private async createHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
