import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  readonly nickname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
