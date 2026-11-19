import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/created-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }


  async register(data: CreateUserDto) {
    const user = await this.userService.createUser(data);
    const { password, id, ...result } = user;
    return result;
  }

  async login(dataLogin: LoginDto) {
    const { phone, password } = dataLogin;

    const user = await this.userService.findByPhoneWithPassword(phone);
    if (!user) {
      throw new UnauthorizedException("phone is wrong")
    }

    if (!user.is_active) {
      throw new UnauthorizedException("the account has been locked")
    }

    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      throw new UnauthorizedException("incorrect password")
    }

    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    }
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    }
  }
}
