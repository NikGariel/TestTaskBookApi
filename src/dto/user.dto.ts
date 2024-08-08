import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangeUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class VerifyEmailUserDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
