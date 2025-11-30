import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['INTERN', 'GOV', 'ENGINEER'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'GOV' | 'ENGINEER';
}
