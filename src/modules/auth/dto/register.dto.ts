import { IsString, IsEmail, IsOptional, IsInt, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phone?: string;

  @IsString()
  @MaxLength(15)
  dni: string;

  @IsInt()
  roleId: number;

  @IsOptional()
  @IsInt()
  farmId?: number;
}
