import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SignupDto } from './auth/signup.dto';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiBody({
    description: 'Login with username and password',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'jane_smith' },
        password: { type: 'string', example: 'securePass456' },
      },
    },
  })
  @Post('auth/login')
  login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiTags('Get User Data by JWT')
  @UseGuards(JwtAuthGuard)
  @Get('auth/user-data')
  getProfile(@Request() req) {
    console.log('User from JWT:', req.user);
    return req.user;
  }

  @ApiTags('Sign UP')
  @Post('auth/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiTags('Refresh Token')
  @Post('auth/refresh')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzQ1MzkzNDExLCJleHAiOjE3NDU0Nzk4MTF9.ymw5DPkFHHYcG9l1kY95nu35gAch-bmbA8jJAgASbkg',
        },
      },
    },
  })
  refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken)
      throw new BadRequestException('Refresh token is required');
    return this.authService.refreshToken(refreshToken);
  }

  @ApiTags('Delete Employee Users by ID')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    example: 5,
    description: 'รหัสผู้ใช้ (user ID) ที่ต้องการลบ',
  })
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
