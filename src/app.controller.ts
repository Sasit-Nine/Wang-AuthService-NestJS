import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SignupDto } from './auth/signup.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('auth/user-data')
  getProfile(@Request() req) {
    console.log('User from JWT:', req.user);
    return req.user;
  }

  @Post('auth/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  @Delete('auth/delete-user/:id')
  async deleteUser(@Param('id') userId: number) {
    try {
      const result = await this.authService.deleteUser(userId);
      return result;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      throw new Error(error.message);
    }
  }
}
