import { IsString, IsOptional, IsDateString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  @IsString()
  user_username: string;

  @ApiProperty()
  @IsString()
  user_password: string;

  @ApiProperty()
  @IsString()
  emp_code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_nickTH?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_nickEng?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_titleTH?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_titleEng?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_firstTH?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_firstEng?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_lastTH?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_lastEng?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_idCard?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_idVat?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vat_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_idSSO?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_sex?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  emp_email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dep_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pos_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emp_bankNo?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  emp_birthdate?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  emp_datetime?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  emp_dateWork?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  emp_saveWork?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  emp_exitWork?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type_code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pay_code?: string;
}
