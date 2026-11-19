import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    });
  }

  // Hàm này tự động chạy sau khi Token được giải mã hợp lệ
  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    // Dữ liệu return ở đây sẽ được gán vào req.user
    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    };
  }
}