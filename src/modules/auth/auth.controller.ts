import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/created-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post("/register")
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data)
  }

  @Post("/login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  async getProfile(@Req() req: any) {
    return req.user
  }
}
