import { IsString, IsOptional, IsDateString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

function generateRandomUsername(): string {
  const firstNames = ['john', 'jane', 'mike', 'alice', 'bob'];
  const lastNames = ['doe', 'smith', 'brown', 'johnson', 'lee'];
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return randomFirstName + randomLastName + Math.floor(Math.random() * 1000); // เพิ่มเลขสุ่มเพื่อให้ username เป็นเอกลักษณ์
}

export class SignupDto {
  @ApiProperty({ example: `${generateRandomUsername()}` })
  @IsString()
  user_username: string;

  @ApiProperty({ example: 'secureP@ss123' })
  @IsString()
  user_password: string;

  @ApiProperty({ example: 'EMP001' })
  @IsString()
  emp_code: string;

  @ApiProperty({ example: 'จอห์น' })
  @IsOptional()
  @IsString()
  emp_nickTH?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  emp_nickEng?: string;

  @ApiProperty({ example: 'นาย' })
  @IsOptional()
  @IsString()
  emp_titleTH?: string;

  @ApiProperty({ example: 'Mr.' })
  @IsOptional()
  @IsString()
  emp_titleEng?: string;

  @ApiProperty({ example: 'สมชาย' })
  @IsOptional()
  @IsString()
  emp_firstTH?: string;

  @ApiProperty({ example: 'Somchai' })
  @IsOptional()
  @IsString()
  emp_firstEng?: string;

  @ApiProperty({ example: 'ใจดี' })
  @IsOptional()
  @IsString()
  emp_lastTH?: string;

  @ApiProperty({ example: 'Jaidee' })
  @IsOptional()
  @IsString()
  emp_lastEng?: string;

  @ApiProperty({ example: '1101701234567' })
  @IsOptional()
  @IsString()
  emp_idCard?: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  emp_floor?: number;

  @ApiProperty({ example: '1234567890123' })
  @IsOptional()
  @IsString()
  emp_idVat?: string;

  @ApiProperty({ example: 'VAT001' })
  @IsOptional()
  @IsString()
  vat_code?: string;

  @ApiProperty({ example: '9876543210987' })
  @IsOptional()
  @IsString()
  emp_idSSO?: string;

  @ApiProperty({ example: 'M' })
  @IsOptional()
  @IsString()
  emp_sex?: string;

  @ApiProperty({ example: '0891234567' })
  @IsOptional()
  @IsString()
  emp_phone?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  emp_email?: string;

  @ApiProperty({ example: 'DEP01' })
  @IsOptional()
  @IsString()
  dep_code?: string;

  @ApiProperty({ example: 'POS02' })
  @IsOptional()
  @IsString()
  pos_code?: string;

  @ApiProperty({ example: 'KTB' })
  @IsOptional()
  @IsString()
  bank_code?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  emp_bankNo?: string;

  @ApiProperty({ example: '1990-05-20' })
  @IsOptional()
  @IsDateString()
  emp_birthdate?: string;

  @ApiProperty({ example: '2025-04-23T14:30:00Z' })
  @IsOptional()
  @IsDateString()
  emp_datetime?: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsOptional()
  @IsDateString()
  emp_dateWork?: string;

  @ApiProperty({ example: '2022-02-01' })
  @IsOptional()
  @IsDateString()
  emp_saveWork?: string;

  @ApiProperty({ example: '2030-12-31' })
  @IsOptional()
  @IsDateString()
  emp_exitWork?: string;

  @ApiProperty({ example: 'TYPE01' })
  @IsOptional()
  @IsString()
  type_code?: string;

  @ApiProperty({ example: 'PAY01' })
  @IsOptional()
  @IsString()
  pay_code?: string;
}
