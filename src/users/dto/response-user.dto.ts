import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  email: string;

  @Expose()
  nickname: string;
}
