import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './signup.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.user_password === pass) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async deleteUser(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    void this.employeesService.update(user.emp_code, {
      emp_exitWork: new Date(),
    });

    void this.usersService.delete(userId);
    return { message: 'User deleted successfully' };
  }

  async signup(signupDto: SignupDto) {
    const {
      user_username,
      user_password,
      emp_code,
      emp_nickTH,
      emp_nickEng,
      emp_titleTH,
      emp_titleEng,
      emp_firstTH,
      emp_firstEng,
      emp_lastTH,
      emp_lastEng,
      emp_idCard,
      emp_idVat,
      vat_code,
      emp_idSSO,
      emp_sex,
      emp_phone,
      emp_email,
      dep_code,
      pos_code,
      bank_code,
      emp_bankNo,
      emp_birthdate,
      emp_datetime,
      emp_dateWork,
      emp_saveWork,
      emp_exitWork,
      type_code,
      pay_code,
    } = signupDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const employee = await this.employeesService.create({
      emp_code,
      emp_nickTH,
      emp_nickEng,
      emp_titleTH,
      emp_titleEng,
      emp_firstTH,
      emp_firstEng,
      emp_lastTH,
      emp_lastEng,
      emp_idCard,
      emp_idVat,
      vat_code,
      emp_idSSO,
      emp_sex,
      emp_phone,
      emp_email,
      dep_code,
      pos_code,
      bank_code,
      emp_bankNo,
      emp_birthdate,
      emp_datetime,
      emp_dateWork,
      emp_saveWork,
      emp_exitWork,
      type_code,
      pay_code,
    });

    const user = await this.usersService.create({
      user_username,
      user_password,
      emp_code: employee.emp_code,
    });

    const payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      message: 'SignUp Success',
      access_token,
      user,
    };
  }
}
