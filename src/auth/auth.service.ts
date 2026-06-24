import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(body: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = await this.usersService.create({
      email: body.email,
      name: body.name,
      password: passwordHash,
    });

    return user;
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    role: string;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        },
      );

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException();
      }

      const tokens = await this.generateTokens(user);

      await this.usersService.updateRefreshToken(
        user.id,
        await bcrypt.hash(tokens.refreshToken, 10),
      );

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException();
    }
  }

  async login(body: LoginDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user);
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);

    await this.usersService.updateRefreshToken(user.id, refreshHash);

    return tokens;
  }

  async logout(userId: string, res: Response) {
    await this.usersService.updateRefreshToken(userId, null);

    res.clearCookie('refreshToken');

    return {
      success: true,
    };
  }
}
