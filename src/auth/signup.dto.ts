import { IsString, IsOptional, IsDateString, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString()
  user_username: string;

  @IsString()
  user_password: string;

  @IsString()
  emp_code: string;

  @IsOptional()
  @IsString()
  emp_nickTH?: string;

  @IsOptional()
  @IsString()
  emp_nickEng?: string;

  @IsOptional()
  @IsString()
  emp_titleTH?: string;

  @IsOptional()
  @IsString()
  emp_titleEng?: string;

  @IsOptional()
  @IsString()
  emp_firstTH?: string;

  @IsOptional()
  @IsString()
  emp_firstEng?: string;

  @IsOptional()
  @IsString()
  emp_lastTH?: string;

  @IsOptional()
  @IsString()
  emp_lastEng?: string;

  @IsOptional()
  @IsString()
  emp_idCard?: string;

  @IsOptional()
  @IsString()
  emp_idVat?: string;

  @IsOptional()
  @IsString()
  vat_code?: string;

  @IsOptional()
  @IsString()
  emp_idSSO?: string;

  @IsOptional()
  @IsString()
  emp_sex?: string;

  @IsOptional()
  @IsString()
  emp_phone?: string;

  @IsOptional()
  @IsEmail()
  emp_email?: string;

  @IsOptional()
  @IsString()
  dep_code?: string;

  @IsOptional()
  @IsString()
  pos_code?: string;

  @IsOptional()
  @IsString()
  bank_code?: string;

  @IsOptional()
  @IsString()
  emp_bankNo?: string;

  @IsOptional()
  @IsDateString()
  emp_birthdate?: string;

  @IsOptional()
  @IsDateString()
  emp_datetime?: string;

  @IsOptional()
  @IsDateString()
  emp_dateWork?: string;

  @IsOptional()
  @IsDateString()
  emp_saveWork?: string;

  @IsOptional()
  @IsDateString()
  emp_exitWork?: string;

  @IsOptional()
  @IsString()
  type_code?: string;

  @IsOptional()
  @IsString()
  pay_code?: string;
}
